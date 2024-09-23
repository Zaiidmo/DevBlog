document.getElementById("search-input").addEventListener("input", function () {
    const query = this.value.trim();
    const articles = document.querySelectorAll(".article-item");
  
    console.log("Search query:", query); // Log the current query
  
    articles.forEach((article) => {
      const title = article.getAttribute("data-title");
      console.log("Article title:", title); 
  
      if (title.startsWith(query)) {
        article.classList.remove("hidden"); 
        console.log("Showing article:", title); 
      } else {
        article.classList.add("hidden"); 
        console.log("Hiding article:", title); 
      }
    });
  });
  