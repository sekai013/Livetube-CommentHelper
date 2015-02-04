'use strict';

App.AuthorFormView = Backbone.View.extend({

	events: {
		'submit form': 'onSubmitForm'
	},

	render: function() {
		var template = $('#authorFormViewTemplate').html();
		var compiled = _.template(template);
		var html     = compiled(this.model.toJSON());

		this.$el.append(html);

		return this;
	},

	onSubmitForm: function(e) {
		e.preventDefault();

		var authorName = $('#authorName').val().trim();

		if(authorName) {
			var attributes = {};

			attributes.name  = authorName;
			attributes.id    = authorName;
			attributes.words = this.model.get('words');
			this.trigger('submitForm', attributes);
		}
	}
});
