// Get references to DOM elements
const commentSection = document.getElementById("commentsSection");
const button = document.getElementById("showComments");
const commentForm = document.getElementById("commentForm");

// Function to fetch and display comments
async function fetchAndDisplayComments() {
    try {
        const response = await fetch('/comments');
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
    const commentsContainer = commentSection.querySelector('.max-w-2xl');
    if (commentsContainer) {
        // Keep the form and title, remove only the existing comments
        const existingComments = commentsContainer.querySelectorAll('article');
        existingComments.forEach(comment => comment.remove());

        // Append new comments
        comments.forEach(comment => {
            const commentElement = createCommentElement(comment);
            commentsContainer.appendChild(commentElement);
        });
    }
}

// Function to create a comment element
function createCommentElement(comment) {
    const article = document.createElement('article');
    article.className = 'comment';
    article.innerHTML = `
        <div class="comment-header">
            <img class="comment-avatar" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="${comment.User.username}">
            <a href="#" class="comment-author">${comment.User.username}</a>
            <span class="comment-time">${new Date(comment.createdAt).toLocaleDateString()}</span>
        </div>
        <p class="comment-content">${comment.content}</p>
        <div class="comment-actions">
            <span class="comment-action">Like</span>
            <span class="comment-action">Reply</span>
            <button class="delete-comment" data-comment-id="${comment.id}">Delete</button>
        </div>
    `;
    return article;
}

// Event listener for the "Read more" button
button.addEventListener('click', () => {
    if (commentSection.style.display === "none") {
        commentSection.style.display = "block";
        fetchAndDisplayComments();
    } else {
        commentSection.style.display = "none";
    }
});

// Comment form submission logic
commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const commentInput = document.getElementById('comment');
    const articleId = document.getElementById('articleId').value;
    const isAnonymous = document.getElementById('anonymousCheck').checked;
    let userId = document.getElementById('userId').value;

    if (isAnonymous) {
        userId = null;
    }

    const comment = commentInput.value.trim();
    if (comment === '') {
        console.log('Comment cannot be empty');
        return;
    }

    try {
        const response = await fetch('/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: comment, userId, articleId })
        });

        if (response.ok) {
            console.log('Comment posted successfully');
            // Clear the comment input
            commentInput.value = '';
            // Refresh the comments after posting
            fetchAndDisplayComments();
        } else {
            console.log('Error posting comment');
        }
    } catch (error) {
        console.error('Error during the request', error);
    }
});

// Initial fetch of comments when the page loads
document.addEventListener('DOMContentLoaded', () => {
    if (commentSection.style.display !== "none") {
        fetchAndDisplayComments();
    }
});

// Event delegation for delete buttons
commentSection.addEventListener('click', async (e) => {
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
        console.log('Comment deleted successfully');
        // Refresh the comments after deleting
        fetchAndDisplayComments();
    } catch (error) {
        console.error('Error deleting comment:', error);
    }
}