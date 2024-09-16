// Handle the delete article button
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

  // Handle the update article form
  const updateButton = document.getElementById('edit-btn');
  const editModal = document.getElementById('update-article');
  const closeBtn = document.getElementById('close-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  const updateArticleForm = document.getElementById('update-article-form');

  updateButton.addEventListener('click', function() {
    editModal.classList.toggle('hidden');
  });
  closeBtn.addEventListener('click', function() {
    editModal.classList.add('hidden');
  });
  cancelBtn.addEventListener('click', function() {
    editModal.classList.add('hidden');
  });

  updateArticleForm.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const form = event.target;
    const formData = new FormData(form); 
    const articleId = formData.get('articleId'); 
  
    try {
      const response = await fetch(`/articles/${articleId}`, {
        method: 'PUT',
        body: formData // Send the form data, including files
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(data.message); // Show success message
        window.location.href = `/articles/${articleId}`; // Redirect to the updated article page
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Error updating article:", error);
      alert("There was a problem updating the article");
    }
  });
