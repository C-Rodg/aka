// TODO: Get from storage.
const testAliases = {
	g: 'https://google.com', // Maps to g/
	e: 'https://espn.com', // Maps to: e/
	'r/###': 'https://redit.com/r/###',
};

// Add listener for when the extension is installed.
chrome.runtime.onInstalled.addListener(() => {
	console.log('extension installed');
});

// Add listener for when tabs are updated.
chrome.tabs.onUpdated.addListener(onTabUpdate);

// Tab has been updated.
function onTabUpdate(tabId, changeInfo, tab) {
	console.log('onTabUpdate');
	console.log(changeInfo);
	const url = tab.url;
	const urlStripped = /^http[s]?:\/\/(.*)/g.exec(url);
	if (urlStripped && urlStripped.length >= 2) {
		const akaParts = urlStripped[1].split('/');
		checkForMatchingAlias(tabId, akaParts[0], akaParts.splice(1));
	}
}

// Check if an alias was entered that we know about.
function checkForMatchingAlias(tabId, input, remainder) {
	let redirectTo = testAliases[input];
	if (redirectTo) {
		// Add on a protocol if it isn't included.
		if (redirectTo.indexOf('://') < 0) {
			redirectTo = `https://${redirectTo}`;
		}
		console.log('REDIRECT: ' + redirectTo);
		chrome.tabs.update(tabId, { url: redirectTo });
	}
}
