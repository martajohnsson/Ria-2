define([
      'Backbone',
      'UserCollection',
      'CategoryCollection',
      'models/UserModel',
      'models/CategoryModel'
    ],
  function( Backbone, UserCollection, CategoryCollection, UserModel, CategoryModel ) {
    var TaskModel = Backbone.RelationalModel.extend({
      relations : [
        {
          type : Backbone.HasOne,
          key : 'user',
          relatedModel : UserModel,
          includeInJSON : Backbone.Model.prototype.idAttribute,
          collectionType : UserCollection,
          reverseRelation : {
            type : Backbone.HasMany,
            key : 'task'
          }
        },
        {
          type : Backbone.HasOne,
          key : 'category',
          relatedModel : CategoryModel,
          includeInJSON : Backbone.Model.prototype.idAttribute,
          collectionType : CategoryCollection,
          reverseRelation : {
            type : Backbone.HasMany,
            key : 'task'
          }
        }
      ],

      toggleCompleted : function() {
       if ( this.attributes.completed === false ) {
          this.set( { completed : true } );
        } else {
          this.set( { completed : false } );
        }

        this.save();

      },
      
      /**
        * @param {Array} attrs The attributes to validate.
        * @returns {String} If something does not validate, return string
        * (throw error in backbone.) does not run set or save on model.
        */
      validate : function( attrs ) {
        if (  !attrs.content || !attrs.user || !attrs.category ) {
               throw "The task object does not validate.";
        }
      }  
    });

    return TaskModel;
  }
);