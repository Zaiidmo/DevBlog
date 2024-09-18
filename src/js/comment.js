// const session = require("express-session");

// const { json } = require("sequelize");

// Get references to DOM elements
const commentSection = document.getElementById("comments");
const commentForm = document.getElementById("commentForm");
const commentInput = document.getElementById("content");
const commentsContainer = document.createElement('div');
commentSection.appendChild(commentsContainer);
const commentCountElement = commentSection.querySelector('h2');
const articleIdInput = document.getElementById("articleId");

// Get the article ID from the input field
     
const urlParts = window.location.pathname.split('/');
const articleId = urlParts[urlParts.length - 1]; //
// Function to fetch and display comments for a specific article
async function fetchAndDisplayComments() {
    try {
        const response = await fetch(`/comments/article/${articleId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const comments = await response.json();
        displayComments(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
}

// Function to display comments
function displayComments(comments) {
    commentsContainer.innerHTML = ''; // Clear the container
    commentCountElement.textContent = `Comments (${comments.length})`; // Update the comment count

    comments.forEach(comment => {
        const commentElement = createCommentElement(comment);
        commentsContainer.appendChild(commentElement);
    });
}

// Function to create a comment element
function createCommentElement(comment) {
    const article = document.createElement('article');
    article.className = 'p-6 text-base bg-gray-900 border-b border-gray-700';
    article.innerHTML = `
        <footer class="flex justify-between items-center mb-2">
            <div class="flex items-center">
                <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                    <img class="mr-2 w-6 h-6 rounded-full" src="${comment.userImage || 'https://flowbite.com/docs/images/people/profile-picture-2.jpg'}" alt="${comment.username || 'Anonymous'}">
                    ${comment.username || 'Anonymous'}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    <time pubdate datetime="${comment.createdAt}" title="${new Date(comment.createdAt).toLocaleDateString()}">
                        ${new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </time>
                </p>
            </div>
        </footer>
        <p class="text-gray-500 dark:text-gray-400">${comment.content}</p>
        <button class="delete-comment mt-2 text-sm text-red-600 hover:underline" data-comment-id="${comment.id}">Delete</button>
    `;
    return article;
}

// Comment form submission logic
document.addEventListener('DOMContentLoaded', () => {
    // Extract the articleId from the URL
    const urlParts = window.location.pathname.split('/');
    const articleId = urlParts[urlParts.length - 1]; // Assuming the ID is at the end of the URL
  
    // Set the articleId value in the hidden input
    const articleIdInput = document.getElementById('articleId');
    articleIdInput.value = articleId;
  
    // Add event listener to handle form submission
    const commentForm = document.getElementById('commentForm');
    const commentInput = document.getElementById('content'); // Assuming you have this
  
    commentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const content = commentInput.value.trim();
      if (!content) {
        console.log('Comment cannot be empty');
        return;
      }
  
      try {
        const response = await fetch('/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ articleId, content }),
        });
  
        if (response.ok) {
          const newComment = await response.json();
          commentInput.value = ''; // Clear the input field
          const commentElement = createCommentElement(newComment);
          commentsContainer.insertBefore(commentElement, commentsContainer.firstChild); // Add to the top
          const currentCount = parseInt(commentCountElement.textContent.match(/\d+/)[0], 10);
          commentCountElement.textContent = `Comments (${currentCount + 1})`; // Increment count
        } else {
          console.log('Error posting comment');
        }
      } catch (error) {
        console.error('Error during the request:', error);
      }
    });
  });
  

// Event delegation for delete buttons
commentsContainer.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-comment')) {
        const commentId = e.target.dataset.commentId;
        await deleteComment(commentId);
    }
});

async function deleteComment(commentId) {
    try {
        const response = await fetch(`/comments/${commentId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        fetchAndDisplayComments(); // Refresh comments after deletion
    } catch (error) {
        console.error('Error deleting comment:', error);
    }
}

// Initial fetch of comments when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayComments);
