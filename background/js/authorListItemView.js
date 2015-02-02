'use strict';

App.AuthorListItemView = Backbone.View.extend({

	tagName: 'tr',

	initialize: function() {
		this.listenTo(this.model, 'destroy', this.remove);
	},

	events: {
		'click .btn-danger': 'onClickDelete'
	},

	render: function() {
		var template = $('#authorListItemViewTemplate').html();
		var compiled = _.template(template);
		var html     = compiled(this.model.toJSON());

		this.$el.append(html);

		return this;
	},

	onClickDelete: function() {
		console.log('deleted');
		console.log(this.model);
		this.model.destroy();
		console.log(this.model);
	}
});
