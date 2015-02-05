'use strict';

(function() {
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

		var actions = {
			pasteWord: function() {
				var selectedInput = $("form#comment_form div[id ^= 'comment']:visible > :input")[0];

				selectedInput.value += request.content;
			},

			postWord: function() {
				var selectedInput = $("form#comment_form div[id ^= 'comment']:visible > :input")[0];
				var postButton    = $('div#comment_input_view_02 button.btn')[0];

				selectedInput.value += request.content;
				postButton.click();
			}
		};

		if(request.action in actions) {
			actions[request.action]();
		}
	});
})();
