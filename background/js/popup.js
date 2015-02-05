'use strict';

window.App = {};

$(function() {

	App.authorCollection = new App.AuthorCollection();
	App.mainContainer    = new App.Container({
		el: '#mainContainer'
	});

	App.authorCollection.fetch().then(function(authors) {
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
