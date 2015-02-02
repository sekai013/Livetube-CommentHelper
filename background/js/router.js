'use strict';

App.Router = Backbone.Router.extend({
	routes: {
		'author/list'  : 'showAuthorList',
		'*anythingElse': 'defaultRoute'
	},

	showAuthorList: function() {
		var authorListView = new App.AuthorListView({
			authorCollection: App.authorCollection
		});

		App.mainContainer.show(authorListView);
	},

	defaultRoute: function() {
		this.showAuthorList();
		this.navigate('author/list');
	}
});
