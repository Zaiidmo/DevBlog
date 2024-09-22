document.getElementById('search').addEventListener('input', async function() {
    const query = this.value.trim();
  
    if (query.length < 1) {
      displayDefaultArticles(); // Function to show all articles when input is cleared
      return;
    }
  
    try {
      const response = await fetch(`/articles/search?query=${encodeURIComponent(query)}`);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      displayArticles(data.articles); // Function to display articles
    } catch (error) {
      console.error('Error during search:', error);
    }
  });
  
  // Function to display articles
  function displayArticles(articles) {
    const articlesSection = document.getElementById('articles-section');
    articlesSection.innerHTML = ''; // Clear previous results
  
    if (articles.length === 0) {
      articlesSection.innerHTML = '<p>No articles found.</p>';
      return;
    }
  
    articles.forEach(article => {
      articlesSection.innerHTML += `
        <div class="max-w-sm border rounded-lg shadow bg-gray-800 border-gray-700">
          <a href="/articles/${article.id}">
            <img class="rounded-t-lg" src="${article.poster}" alt="" />
          </a>
          <div class="p-5">
            <a href="/articles/${article.id}">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-white">
                ${article.title}
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-400">${article.description}</p>
            <a href="/articles/${article.id}" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-yellow-400 rounded-lg hover:bg-yellow-800">
              Read more
            </a>
          </div>
        </div>
      `;
    });
  }
  
  // Function to display default articles (optional)
  function displayDefaultArticles() {
    // Implement logic to fetch and display all articles
  }
  