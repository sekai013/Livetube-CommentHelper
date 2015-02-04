'use strict';

App.WordView = Backbone.View.extend({

	tagName: 'tr',

	events: {
		'click button#removeWord': 'onClickRemove'
	},

	render: function() {
		var template = $('#wordViewTemplate').html();
		var compiled = _.template(template);
		var html     = compiled(this.model.toJSON());

		this.$el.append(html);

		return this;
	},

	onClickRemove: function() {
		var content = this.$('#content').text();
		
		this.model.destroy();
		this.trigger('wordRemoved', content);
	}
});
