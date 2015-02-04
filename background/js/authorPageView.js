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

		this.model.get('words').forEach(function(word) {
			var wordView = new App.WordView({
				model: new App.Word({ content: word })
			});

			wordView.on('wordRemoved', wordRemovedHandler, wordView);
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
