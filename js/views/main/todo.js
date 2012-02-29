define(
	['Backbone'],

	function( Backbone ) {
		var TodoView = Backbone.View.extend({
			className : 'todo',
			tagName: "div",

			initialize : function() {
				this.template = _.template( $('#todo-template').html() );
				this.model.bind( 'change:completed', this.changed, this );
			},

			events : {
				'click .mark-completed' : 'markCompleted'
			},

			markCompleted : function( e ) {
				this.model.toggleCompleted();
			},

			changed : function( e ) {
				switch( e.attributes.completed ) {
					case true :
						this.$el.css('background', '#c2c2c2' );
						this.$('.mark-completed').attr( 'checked', true );
						break;
					case false :
						this.$el.css('background', '#fff' );
						this.$('.mark-completed').attr( 'checked', false );
						break;
				}
			},

			render : function() {
				// Run to set css.
				this.changed( this.model );

				$(this.el).html( this.template({
					todo : this.model.attributes
				}));
				
				return this;
			}
		});
	
		return TodoView;
	}
);