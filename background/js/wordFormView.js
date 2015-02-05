'use strict';

App.WordFormView = Backbone.View.extend({
	
	events: {
		'submit form': 'onSubmitForm'
	},

	render: function() {
		var template = $('#wordFormViewTemplate').html();
		var compiled = _.template(template);
		var html     = compiled(this.model.toJSON());

		this.$el.append(html);

		return this;
	},

	onSubmitForm: function(e) {
		e.preventDefault();

		var word = $('#word').val().trim();

		if(word) {
			this.trigger('submitForm', word);
		}
	}
});
