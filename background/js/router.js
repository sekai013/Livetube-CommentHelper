'use strict';

App.Router = Backbone.Router.extend({
	routes: {
		'author/list'                  : 'showAuthorList',
		'author/new'                   : 'showNewAuthorForm',
		'author/:id/edit'              : 'showEditAuthorForm',
		'author/:id/word/new'          : 'showNewWordForm',
		'author/:id/word/:content/edit': '',
		'author/:id'                   : 'showAuthorPage',
		'*anythingElse'                : 'defaultRoute'
	},

	showAuthorList: function() {
		var authorListView = new App.AuthorListView({
			authorCollection: App.authorCollection
		});

		App.mainContainer.show(authorListView);
	},

	showNewAuthorForm: function() {
		var authorFormView = new App.AuthorFormView({
			model: new App.Author()
		});
		var self = this;

		authorFormView.on('submitForm', function(attributes) {
			var newAuthor = new App.Author(attributes);

			App.authorCollection.add(newAuthor);
			newAuthor.save();
			self.showAuthorList();
			self.navigate('author/list');
		});

		App.mainContainer.show(authorFormView);
	},

	showEditAuthorForm: function(id) {
		var author         = App.authorCollection.get(id);
		var authorFormView = new App.AuthorFormView({
			model: author
		});
		var self = this;

		authorFormView.on('submitForm', function(attributes) {
			if(attributes.id !== author.get('id')) {
				var renewedAuthor = new App.Author(attributes);

				author.destroy();
				App.authorCollection.add(renewedAuthor);
				renewedAuthor.save();
				self.showAuthorList();
				self.navigate('author/list');
			}
		});

		App.mainContainer.show(authorFormView);
	},

	showNewWordForm: function(id) {
		var wordFormView = new App.WordFormView({
			model: new App.Word()
		});
		var self = this;

		wordFormView.on('submitForm', function(word) {
			var author = App.authorCollection.get(id);

			author.get('words').push(word);
			author.save();
			self.showAuthorPage(id);
			self.navigate('author/' + id);
		});

		App.mainContainer.show(wordFormView);
	},

	showEditWordForm: function(id, content) {
		var restoredContent = content.replace(/<br>/g, '\n').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
		var wordFormView = new App.WordFormView({
			model: new App.Word({ content: restoredContent })
		});
		var author = App.authorCollection.get(id);
		var index  = author.get('words').indexOf(restoredContent);
		var self   = this;

		wordFormView.on('submitForm', function(word) {
			if(word !== restoredContent) {
				if(index === -1) {
					author.get('words').push(word);
				} else {
					author.get('words').splice(index, 1, word);
				}

				author.save();
			}

			self.showAuthorPage(id);
			self.navigate('author/' + id);
		});

		App.mainContainer.show(wordFormView);
	},

	showAuthorPage: function(id) {
		var author         = App.authorCollection.get(id);
		var authorPageView = new App.AuthorPageView({
			model: author
		});

		authorPageView.on('wordEdited', function(detail) {
			this.showEditWordForm(detail.authorId, detail.content);
			this.navigate('author/' + detail.authorId + '/word/' + detail.content);
		}, this);

		App.mainContainer.show(authorPageView);
	},

	defaultRoute: function() {
		this.showAuthorList();
		this.navigate('author/list');
	}
});
