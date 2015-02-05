'use strict';

window.App = {};

$(function() {

	var initializeAuthors = function() {
		var authorCollection = new App.AuthorCollection([{
			name : 'sekai',
			id   : 'sekai',
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

		var urlRegExp = /http:\/\/[htz]?\.?livetube\.cc\/([^\/]*)\/[^\/]*/;
		var query = {
			active  : true,
			windowId: chrome.windows.WINDOW_ID_CURRENT
		};

		chrome.tabs.query(query, function(tabs) {
			var currentTab = tabs[0];
			var currentURL = currentTab.url;
			var match = urlRegExp.exec(currentURL);

			if(match) {
				App.authorId = decodeURI(match[1]);
				App.tabId    = currentTab.id;
				
				var author = App.authorCollection.get(App.authorId);

				App.isNewAuthor = (typeof author === 'undefined');
			}

			App.router = new App.Router();
			Backbone.history.start();
		});
	});
});
