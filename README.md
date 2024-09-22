
# DevBlog: A Modern Blogging Platform

## Overview
DevBlog is a cutting-edge blog platform designed to simplify content creation and management. It allows users to create, edit, and manage articles, offering a seamless and intuitive user experience. The platform also supports user authentication, likes, and rich profile management. Built using Node.js and Express, DevBlog integrates a MySQL database using Sequelize ORM, offering robust data management capabilities.

## Features
- **User Registration & Authentication**: Secure signup and login process with hashed passwords.
- **Profile Management**: Users can update their profile information including an avatar, job title, skills, and social media links.
- **Article Management**: Users can create, update, and delete their articles, complete with title, content, and descriptions.
- **Comments Management**: Users can comment to any article they want, and delete their comments whenever they like .
- **Responsive Design**: The application works beautifully across mobile, tablet, and desktop devices using Tailwind CSS.
- **Likes**: Users can like articles, creating a dynamic, engaging experience.
- **Seamless UX**: The platform uses modals and AJAX for smooth user interactions, ensuring no page refreshes are needed during critical actions.

## Technology Stack

### Frontend:
- **HTML5**, **CSS3**, **Tailwind CSS**, **JavaScript**

### Backend:
- **Node.js**, **Express.js**

### Database:
- **MySQL** (using **Sequelize ORM**)

## Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js** (version 14 or higher)
- **MySQL** (version 5.7 or higher)
- **Sequelize CLI**

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/DevBlog.git
   cd DevBlog
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Set up the database**:
   - Create a new MySQL database for the project.
   - Copy `.env.example` to `.env` and update the following fields with your database credentials:
     ```env
     DB_NAME=your_database_name
     DB_USER=your_mysql_username
     DB_PASSWORD=your_mysql_password
     DB_HOST=localhost 
     DB_PORT=3306 
     SECRET_KEY=your_secret_key
     ```

4. **Run migrations**:
   ```bash
   npx sequelize-cli db:migrate
   ```

5. **Start the server**:
   ```bash
   npm run build
   ```
   ```bash
   node server.js
   ```
   The server will be live at `http://localhost:3000`.

## API Endpoints

<!-- ### User Management
- **POST /api/users/register**: Register a new user
- **POST /api/users/login**: Authenticate a user

### Article Management
- **GET /api/articles**: Retrieve all articles
- **POST /api/articles**: Create a new article
- **PUT /api/articles/:id**: Update an article
- **DELETE /api/articles/:id**: Delete an article -->

## Database Models

### User Model
The user model includes fields such as:
- `username`: Unique and required.
- `email`: Unique and validated for correct format.
- `password`: Hashed before storage for security.
- `avatar`, `aboutMe`, `skills`, `socialMedia`: Optional profile fields.

### Article Model
The article model includes:
- `title`: Required.
- `description`: Short overview.
- `content`: Full article body.
- `poster`: Optional image URL.
- `userId`: Foreign key linking the article to the user.

### Comment Model 
The comment model includes: 
- `content`: Required
- `userId` : Foreign key linking the comment to the user.
- `articleId` : Foreign key linking the comment to the article.

## Contributing
We welcome contributions! Please fork this repository, submit a pull request, or open an issue if you have suggestions.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgments
- Special thanks to the `MernOps Masters` and Specially the `ScriptMaster` classmates for their continuous support.