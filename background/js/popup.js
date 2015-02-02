'use strict';

window.App = {};

$(function() {

	var initializeAuthors = function() {
		var authorCollection = new App.AuthorCollection([{
			name : 'sekai',
			words: ['this', 'is', 'sample']
		}]);

		authorCollection.each(function(author) {
			author.save();
		});

		return authorCollection.models;
	};

	App.authorCollection = new App.AuthorCollection();
	App.mainContainer    = new App.Container({
		el: '#mainContainer'
	});

	App.authorCollection.fetch().then(function(authors) {
		if(authors.length === 0) {
			var models = initializeAuthors();
			App.authorCollection.reset(models);
		}

		App.router = new App.Router();
		Backbone.history.start();
	});
});
