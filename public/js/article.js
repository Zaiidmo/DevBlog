document.getElementById('deleteArticle').addEventListener('click', async function () {
    const articleId = this.getAttribute('data-id');
    
    try {
      const response = await fetch(`/articles/${articleId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Check if the response was successful
      if (response.ok) {
        alert('Article deleted successfully');
        window.location.href = '/articles';
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Unable to delete the article'}`);
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('An error occurred while trying to delete the article.');
    }
  });