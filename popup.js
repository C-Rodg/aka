const testAliases = [
	{
		alias: 'g/',
		redirect: 'https://google.com',
	},
	{
		alias: 'e/',
		redirect: 'https://espn.com',
	},
	{
		alias: 'r/###',
		redirect: 'https://redit.com/r/###',
	},
];

function renderResults() {
	// Empty the search results
	searchResultsEl.innerHTML = '';

	// Create the results to show.
	const resultsListEl = document.createElement('ul');
	testAliases.forEach((result) => {
		// Create the list element with data props attached.
		const li = document.createElement('li');
		li.dataset.alias = result.alias;
		li.dataset.redirect = result.redirect;

		// Create the alias element.
		const aliasEl = document.createElement('div');
		aliasEl.classList.add('alias');
		aliasEl.textContent = result.alias;

		// Create the redirect element.
		const redirectEl = document.createElement('div');
		redirectEl.classList.add('redirect');
		redirectEl.textContent = result.redirect;

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
