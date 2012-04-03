define([
 		'jQuery',
 		'Underscore',
 		'Backbone',
 		'models/CategoryModel'
 	],
 	
 	function( $, _, Backbone, CategoryModel ) {
 		var newCategoryView = Backbone.View.extend({
 			
            el : $('#new-category-div'),

 			initialize : function( categoryCollection ) {
 				// Show the dimmer.
 				$('#category-dimmer').css( 'display', 'block' );

 				this.template = _.template( $( '#create-category-template' ).html() );
 				this.categoryCollection = categoryCollection;

 				this.categoryCollection.on( 'add', this.addCategory, this );

 			},

 			events : {
 				'click #submit-create-category-form' : 'submitCreateCategoryForm',
 				'keypress #input-category' : 'addOnEnter'
 			},

 			addCategory : function( categoryModel ) {
 				categoryModel.save();
 				// remove the view and the dimmer.
 				this.$el.remove();
 				$('#category-dimmer').remove();
 			},

 			addOnEnter : function( e ) {
 				if ( e.keyCode == 13) {
 					this.submitCreateCategoryForm( e );
 					return false;
 				}
 			},

 			render : function() {
 				$(this.el).html( this.template );
 			},

 			submitCreateCategoryForm : function( e ) {
 				var category = this.$('#input-category').val();

 				try {
 					var model = new CategoryModel( { label : category } );
                    
                    
                    if(model.isValid())
                        this.categoryCollection.add(model);
                    else
                    {
                        //category.get("task").remove(taskModel)
                        console.log("Error: Model is not valid");
                        this.$el.remove();
                        $('#category-dimmer').remove();
                    }
                    
 					//this.categoryCollection.add( model );
 					
 					 //Trigger a categoryAdded event.
 					this.trigger( 'categoryAdded' , model );

 				} catch( error ) {
 					console.log( "Error : ", error.message );
 				}
 			}

 		});

 		return newCategoryView;
 	}	
 );