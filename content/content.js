'use strict';

(function() {
	var selectedInput = $("form#comment_form div[id ^= 'comment']:visible > :input")[0];
	var postButton    = $('div#comment_input_view_02 button.btn')[0];

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

		var actions = {
			pasteWord: function() {
				selectedInput.value += request.content;
			},

			postWord: function() {
				selectedInput.value += request.content;
				postButton.click();
			}
		};

		if(request.action in actions) {
			actions[request.action]();
		}
	});

	var onKeyClickHandler = function(e) {
		if(e.ctrlKey && e.which === 13) {
			postButton.click();
		}
	}

	$('body').on('keydown', onKeyClickHandler)
})();
