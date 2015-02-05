'use strict';

App.Word = Backbone.Model.extend({
	defaults: {
		content: ''
	}
});

App.Author = Backbone.Model.extend({
	defaults: {
		name : '',
		words: []
	}
});

App.AuthorCollection = Backbone.Collection.extend({
	model        : App.Author,
	chromeStorage: new Backbone.ChromeStorage('LTCH', 'sync')
});
