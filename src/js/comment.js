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
const deleteBtn=document.getElementById('deleteBtn');

// Get the article ID from the input field
     
const urlParts = window.location.pathname.split('/');
const articleId = urlParts[urlParts.length - 1]; //
// Function to fetch and display comments for a specific article
// async function fetchAndDisplayComments() {
//     try {
//         const response = await fetch(`/comments/article/${articleId}`);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const comments = await response.json();
//         displayComments(comments);
//     } catch (error) {
//         console.error('Error fetching comments:', error);
//     }
// }

// Function to display comments
// function displayComments(comments) {
//     commentsContainer.innerHTML = ''; // Clear the container
//     commentCountElement.textContent = `Comments (${comments.length})`; // Update the comment count

//     comments.forEach(comment => {
//         const commentElement = createCommentElement(comment);
//         commentsContainer.appendChild(commentElement);
//     });
// }

// Function to create a comment element
// function createCommentElement(comment) {
//     const article = document.createElement('article');
//     article.className = 'p-6 text-base bg-gray-900 border-b border-gray-700';
//     article.innerHTML = `
//         <footer class="flex justify-between items-center mb-2">
//             <div class="flex items-center">
//                 <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
//                     <img class="mr-2 w-6 h-6 rounded-full" src="${comment.userImage || 'https://flowbite.com/docs/images/people/profile-picture-2.jpg'}" alt="${comment.username || 'Anonymous'}">
//                     ${comment.username || 'Anonymous'}
//                 </p>
//                 <p class="text-sm text-gray-600 dark:text-gray-400">
//                     <time pubdate datetime="${comment.createdAt}" title="${new Date(comment.createdAt).toLocaleDateString()}">
//                         ${new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
//                     </time>
//                 </p>
//             </div>
//         </footer>
//         <p class="text-gray-500 dark:text-gray-400">${comment.content}</p>
//         <button class="delete-comment mt-2 text-sm text-red-600 hover:underline" data-comment-id="${comment.id}">Delete</button>
//     `;
//     return article;
// }

// function createCommentElement(comment) {
//     const article = document.createElement('article');
//     article.className = 'p-6 mb-6 text-base bg-white rounded-lg shadow-md dark:bg-gray-900';
//     article.innerHTML = `
//         <footer class="flex justify-between items-center mb-2">
//             <div class="flex items-center">
//                 <div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
//                     <img class="mr-2 w-10 h-10 rounded-full border-2 border-blue-500 shadow" 
//                          src="${comment.userImage || 'https://flowbite.com/docs/images/people/profile-picture-2.jpg'}" 
//                          alt="${comment.username || 'Anonymous'}">
//                     <span class="font-bold">${comment.username || 'Anonymous'}</span>
//                 </div>
//                 <p class="text-sm text-gray-600 dark:text-gray-400">
//                     <time pubdate datetime="${comment.createdAt}" 
//                           title="${new Date(comment.createdAt).toLocaleDateString()}"
//                           class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
//                         ${new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
//                     </time>
//                 </p>
//             </div>
//         </footer>
//         <p class="text-gray-500 dark:text-gray-400 mt-2 mb-4 font-normal">${comment.content}</p>
//         <div class="flex items-center mt-4 space-x-4">
//             <button type="button" 
//                     class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
//                 <svg class="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
//                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m8-3h-2.5M15 8h-5.5m4.5 4h-5.3m-6.2 0h2.8m-4.3 4h5m0-4H9m3.5 4H15m-2.5 4H15"/>
//                 </svg>
//                 Reply
//             </button>
//             <button type="button" 
//                     class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
//                 <svg class="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
//                     <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z"/>
//                 </svg>
//                 Like
//             </button>
//             <button class="delete-comment text-sm text-red-600 hover:underline dark:text-red-500" data-comment-id="${comment.id}">
//                 <svg class="mr-1.5 w-3.5 h-3.5 inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
//                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
//                 </svg>
//                 Delete
//             </button>
//         </div>
//     `;
//     return article;
// }

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
            location.reload();
          const newComment = await response.json();
          commentInput.value = ''; // Clear the input field
          const commentElement = createCommentElement(newComment);
          commentsContainer.insertBefore(commentElement, commentsContainer.firstChild); // Add to the top
          const currentCount = parseInt(commentCountElement.textContent.match(/\d+/)[0], 10);
          commentCountElement.textContent = `Comments (${currentCount + 1})`; // Increment count
          location.reload();

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

async function deleteComment(event, commentId) {
  event.preventDefault(); // Prevent the form from reloading the page

  try {
      const response = await fetch(`/comments/${commentId}`, {
          method: 'DELETE'
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
      }

      // Reload the page to get the latest data from the backend
      location.reload();

  } catch (error) {
      console.error('Error deleting comment:', error);
  }
}



// Initial fetch of comments when the page loads
// document.addEventListener('DOMContentLoaded', fetchAndDisplayComments);
