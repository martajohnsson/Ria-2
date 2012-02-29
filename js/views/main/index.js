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
				'click #submit-task-form' : 'submitForm',
				'keypress .task-content' : 'addOnEnter'
			},

			addOne : function( taskModel ) {
				taskModel.save();

				// Reset the text-input-field.
				$('.task-content').val('')
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
				
				try {

					this.taskCollection.create({
						content : taskContent,
						time : ( new Date() ).getTime(),
						completed : false,
						user : user,
						category : category
					});

				} catch( error ) {
					console.log( "Error: ", error.message );
				}
			}
		});

		return mainIndexView;
	}
);