define(
	[	
		'jQuery',
		'Underscore',
		'Backbone',
		'models/TaskModel',
		'lib/backbone/backbone.localStorage'
	],

	function( $, _, Backbone, TaskModel ) {
		var mainIndexView = Backbone.View.extend({
			
			initialize : function( categoryCollection, taskCollection, userCollection ) {
				this.template = _.template( $( '#create-task-template' ).html() );
				this.categoryCollection = categoryCollection;
				this.taskCollection = taskCollection;
				this.userCollection = userCollection;

				this.taskCollection.bind( 'add', this.addOne, this );
			},

			events : {
			    'click #clear-completed' : 'clearCompleted',
				'click #submit-task-form' : 'submitForm',
				'keypress .task-content' : 'addOnEnter'
			},

			addOne : function( taskModel ) {
				taskModel.save();

				// Reset the text-input-field.
				$('.task-content').val('')
			},
			
			clearCompleted : function () {
			    var length = this.taskCollection.length;
			    var removeArr = Array();
			    for (var i = 0; i  < length; i++) {
				    if (this.taskCollection.models[i].attributes.completed) {
				        removeArr.push(this.taskCollection.models[i]);
				    }
				};
				
				length = removeArr.length;
				for (var i = 0; i < length; i++) {
                    removeArr[i].destroy();
				};
			},

			addOnEnter : function( e ) {
				if ( e.keyCode == 13) {
					this.submitForm( e );
					return false;
				}
			},

			render : function() {
				this.$el.html( this.template({
					category : this.categoryCollection.models
				}));
			},

			submitForm : function( e ) {
				// Get the needed values for a task.
				var taskContent = this.$('.task-content').val();
				var taskCategoryId = this.$('.task-category').val();
				var category = this.categoryCollection.get( taskCategoryId );
				var user = this.userCollection.at( 0 );
				
				var taskModel =	new TaskModel({
					content : taskContent,
					time : ( new Date() ).getTime(),
					completed : false,
					user : user,
					category : category
				});
                    
                if(taskModel.isValid())
                    this.taskCollection.add(taskModel);
                else
                {
                    category.get("task").remove(taskModel)
                    console.log("Error: Model is not valid");
                }
					   
			}
		});

		return mainIndexView;
	}
);