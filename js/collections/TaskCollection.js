define([
	'Backbone',
	'models/TaskModel'
	],

	function( Backbone, TaskModel ) {
	
	var TasksCollection = Backbone.Collection.extend({
		model : TaskModel,

		localStorage : new Store("Tasks"),

		initialize : function() {
			this.fetch();

			this.model.bind( "change", this.change, this );
		},

		change : function() {
			console.log( "Testar uppdatering av model" );
		}
	});

	return TasksCollection;	

	}
);