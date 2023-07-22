// TODO: Get from storage.
const testAliases = {
	g: 'https://google.com',
	e: 'https://espn.com',
	'r/###': 'https://redit.com/r/###',
};

function renderResults() {
	// Empty the search results
	searchResultsEl.innerHTML = '';

	// Create the results to show.
	const resultsListEl = document.createElement('ul');
	const aliasKeys = Object.keys(testAliases);
	aliasKeys.forEach((key) => {
		const val = testAliases[key];
		// Create the list element with data props attached.
		const li = document.createElement('li');
		li.dataset.alias = key;
		li.dataset.redirect = val;

		// Create the alias element.
		const aliasEl = document.createElement('div');
		aliasEl.classList.add('alias');
		aliasEl.textContent = key;

		// Create the redirect element.
		const redirectEl = document.createElement('div');
		redirectEl.classList.add('redirect');
		redirectEl.textContent = val;

		// Attach the alias, redirect, and list element to the results.
		li.appendChild(aliasEl);
		li.appendChild(redirectEl);
		resultsListEl.appendChild(li);
	});

	// Attach the event listener.
	resultsListEl.addEventListener('click', navigateTo);

	// Attach results to the popup.
	searchResultsEl.appendChild(resultsListEl);
}

function navigateTo(event) {
	const target = event.target;
	const alias = target.dataset.alias;
	const redirect = target.dataset.redirect;

	// Exit early if the click is from an invalid element.
	if (target.tagName != 'LI' || !alias || !redirect) {
		return;
	}

	console.log(`Navigate to: ${redirect} using ${alias}`);
	// TODO: Handle navigation.
}

const searchResultsEl = document.querySelector('.search-results');

// Render the initial results.
renderResults();
