'use strict';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

	var actions = {
		wordCopied: function() {
			chrome.notifications.create('LTCH' + Date.now(), {
				type: 'basic',
				iconUrl: '../img/icon128.png',
				title: 'Copied!',
				message: 'コピーしました!'
			}, function(id) {
				setTimeout(function() {
					chrome.notifications.clear(id, function() {});
				}, 2000);
			});
		}
	};

	if(request.action in actions) {
		actions[request.action]();
	}
});
