'use strict';

App.AuthorPageView = Backbone.View.extend({

	tagName  : 'table',
	className: 'table',
	
	renderWord: function() {
		var $insertionPoint = this.$('#wordViewContainer');
		var self            = this;

		function wordRemovedHandler(content) {
			var words = self.model.get('words');
			var index = words.indexOf(content);

			if(index === -1) {
				return;
			}

			words.splice(index, 1);
			self.model.save();
			this.remove();
		}

		function wordEditedHandler(content) {
			console.log(content);
			self.trigger('wordEdited', {
				content : content,
				authorId: self.model.get('id')
			});
		}

		this.model.get('words').forEach(function(word) {
			var escapedWord = word.replace(/</g, '&lt;').replace(/>/g, '&gt;');
			var wordView = new App.WordView({
				model: new App.Word({ content: escapedWord.replace(/[\r\n]/g, '<br />') })
			});

			wordView.on('wordRemoved', wordRemovedHandler, wordView);
			wordView.on('wordEdited' , wordEditedHandler);
			$insertionPoint.append(wordView.render().$el);
		});
	},

	render: function() {
		var template = $('#authorPageViewTemplate').html();
		var compiled = _.template(template);
		var html     = compiled(this.model.toJSON());

		this.$el.html(html);
		this.renderWord();

		return this;
	}
});
