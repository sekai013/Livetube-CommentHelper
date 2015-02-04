'use strict';

App.WordView = Backbone.View.extend({

	tagName: 'tr',

	events: {
		'click button#removeWord': 'onClickRemove',
		'click button#copyWord'  : 'onClickCopy',
		'click button#editWord'  : 'onClickEdit'
	},

	render: function() {
		var template = $('#wordViewTemplate').html();
		var compiled = _.template(template);
		var html     = compiled(this.model.toJSON());

		this.$el.append(html);

		return this;
	},

	onClickRemove: function() {
		var content = this.$('#content').html().replace(/<br>/g, '\n').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
		
		this.model.destroy();
		this.trigger('wordRemoved', content);
	},

	onClickCopy: function() {
		var content  = this.$('#content').html().replace(/<br>/g, '\n').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
		var textArea = $('<textarea>').prop('value', content).css({ width: '1px' });

		this.$el.append(textArea);
		textArea.select();
		document.execCommand('copy');
		this.$(textArea).remove();
	},

	onClickEdit: function() {
		var content  = this.$('#content').html();

		this.trigger('wordEdited', content);
	}
});
