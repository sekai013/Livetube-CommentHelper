'use strict';

App.WordView = Backbone.View.extend({

	tagName: 'tr',

	events: {
		'click button#copyWord'  : 'onClickCopy',
		'click button#pasteWord' : 'onClickPaste',
		'click button#postWord'  : 'onClickPost',
		'click button#editWord'  : 'onClickEdit',
		'click button#removeWord': 'onClickRemove'
	},

	render: function() {
		var template = $('#wordViewTemplate').html();
		var compiled = _.template(template);
		var html     = compiled(this.model.toJSON());

		this.$el.append(html);

		if(typeof App.authorId === 'undefined') {
			this.$('#pasteWord, #postWord').attr('disabled', true);
		}

		return this;
	},

	onClickCopy: function() {
		var content  = this.$('#content').text();
		var textArea = $('<textarea>').prop('value', content).css({ width: '1px' });

		this.$el.append(textArea);
		textArea.select();
		document.execCommand('copy');
		this.$(textArea).remove();
	},

	onClickPaste: function() {
		var content  = this.$('#content').text();

		chrome.tabs.sendMessage(App.tabId, { content: content, action: 'pasteWord' });
	},

	onClickPost: function() {
		var content  = this.$('#content').text();

		chrome.tabs.sendMessage(App.tabId, { content: content, action: 'postWord' });
	},

	onClickEdit: function() {
		var content  = this.$('#content').text();

		this.trigger('wordEdited', content);
	},

	onClickRemove: function() {
		var content = this.$('#content').text();
		
		this.model.destroy();
		this.trigger('wordRemoved', content);
	}

});
