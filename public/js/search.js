document.querySelector('#search').addEventListener('input', async function() {
  const query = this.value.trim();

  // Clear results if query is empty
  const resultsContainer = document.querySelector('#search-results');
  if (!query) {
    resultsContainer.innerHTML = '';
    return;
  }

  try {
    const response = await fetch(`/articles/search?query=${query}`);
    const data = await response.json();

    // Clear previous results
    resultsContainer.innerHTML = '';

    // Check if the response is OK
    if (!response.ok) {
      resultsContainer.innerHTML = `<p class="text-red-900">${data.error || 'Error fetching results.'}</p>`;
      return;
    }

    // Display search results
    if (data.articles && data.articles.length) {
      data.articles.forEach(article => {
        resultsContainer.innerHTML += `
          <div class="p-4 border mb-2">
            <h3 class="text-lg font-bold">${article.title}</h3>
            <p>${article.description}</p>
          </div>
        `;
      });
    } else {
      resultsContainer.innerHTML = `<p class="text-gray-500">No articles found.</p>`;
    }
  } catch (error) {
    console.error('Error fetching search results:', error);
    resultsContainer.innerHTML = '<p class="text-red-500">Error fetching results. Please try again later.</p>';
  }
});
