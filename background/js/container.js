'use strict';

App.Container = Backbone.View.extend({

	destroy: function(view) {
		if(!view) {
			return;
		}

		view.off();
		view.remove();
	},

	show: function(view) {
		this.destroy(this.currentView);
		this.$el.append(view.render().$el);
		this.currentView = view;
	}
});
