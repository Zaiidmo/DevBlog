# 📝 DevBlog — A Modern Blogging Platform

**DevBlog** is a next-generation blogging platform designed to make content creation, management, and interaction seamless.  
It empowers users to write, share, and engage through articles, likes, comments, and user profiles — all in one modern, responsive interface.

<p align="left">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-18.x-green">
  <img alt="Express.js" src="https://img.shields.io/badge/Express.js-Backend-black">
  <img alt="Sequelize" src="https://img.shields.io/badge/Sequelize-ORM-blue">
  <img alt="TailwindCSS" src="https://img.shields.io/badge/TailwindCSS-Frontend-teal">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-green">
</p>

---

## 🚀 Overview

DevBlog simplifies the blogging workflow with a robust Node.js + Express.js backend, a MySQL database powered by Sequelize ORM, and a responsive TailwindCSS frontend.  
It offers a fluid, AJAX-based user experience without page reloads, ensuring productivity and engagement.

---

## ✨ Features

- 🔐 Secure user authentication (hashed passwords)
- 👤 Profile customization (avatar, job title, skills, social links)
- 📝 Create, edit, and delete articles
- 💬 Comment and reply dynamically (no page reloads)
- ❤️ Like articles to show engagement
- 📱 Fully responsive interface (mobile‑first with TailwindCSS)

---

## 🧠 Tech Stack

**Frontend:** HTML5, CSS3, TailwindCSS, JavaScript  
**Backend:** Node.js, Express.js  
**Database:** MySQL + Sequelize ORM

---

## ⚙️ Installation

### 1️⃣ Prerequisites
- Node.js v14+  
- MySQL v5.7+  
- Sequelize CLI

### 2️⃣ Clone the Repository
```bash
git clone https://github.com/Zaiidmo/DevBlog.git
cd DevBlog
```

### 3️⃣ Install Dependencies
```bash
npm install
```

### 4️⃣ Configure Environment Variables
Copy `.env.example` to `.env` and update values:

```env
DB_NAME=devblog
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=3306
SECRET_KEY=your_secret_key
PORT=3000
```

### 5️⃣ Run Database Migrations
```bash
npx sequelize-cli db:migrate
```

### 6️⃣ Start the Server
```bash
npm run build
node server.js
```
Server runs at [http://localhost:3000](http://localhost:3000)

---

## 🧩 Database Models

**User** → username, email, password, avatar, aboutMe, skills, socialMedia  
**Article** → title, description, content, poster, userId  
**Comment** → content, userId, articleId  

---

## 🤝 Contributing

We welcome all contributions!  
See [CONTRIBUTING.md](CONTRIBUTING.md) for setup and best practices.

---

## 🪪 License

Licensed under the **MIT License** — see [LICENSE](LICENSE).

---

## 📫 Contact

Maintainer: **Zaiid Moumni**  
📧 **vlphadev@gmail.com**
