'use strict';

App.AuthorListView = Backbone.View.extend({

	tagName  : 'table',
	className: 'table',

	initialize: function(option) {
		this.authorCollection = option.authorCollection;
	},

	renderAuthors: function() {
		var $insertionPoint = this.$('#authorListItemViewContainer');

		this.authorCollection.each(function(author) {
			var authorListItemView = new App.AuthorListItemView({
				model: author
			});

			$insertionPoint.append(authorListItemView.render().$el);
		});
	},

	render: function() {
		var template = $('#authorListViewTemplate').html();
		
		this.$el.html(template);
		this.renderAuthors();

		return this;
	}
});
