define(
	['Backbone'],

	function( Backbone ) {
		var TodoView = Backbone.View.extend({
			className : 'todo',
			tagName: "div",
			initialize : function(options) {
				this.template = _.template( $('#todo-template').html() );
			},

			events : {
				'click .mark-completed': 'markCompleted'
			},

			markCompleted : function( e ) {
				this.model.toggleCompleted();
			},

			render : function() {
				$(this.el).html( this.template({
					todo : this.model.attributes
				}));
				
				return this;
			}
		});
	
		return TodoView;
	}
);