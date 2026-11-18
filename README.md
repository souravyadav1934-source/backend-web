# Backend API Starter

**Author:**   
**Project type:** Backend REST API learning project

A beginner-friendly backend REST API inspired by the topics in freeCodeCamp's **Intro to Backend Web Development** tutorial. This is an independently written implementation using Node.js, Express, MongoDB, Mongoose, bcrypt and JSON Web Tokens.

## Features

- User registration with bcrypt password hashing
- User login with JWT authentication
- Current-user endpoint and logout response
- Create, read, update and delete (CRUD) posts
- Only the author of a post can update or delete it
- MongoDB database connection through environment variables
- Clear separation of config, models, controllers, middleware and routes

## Requirements

Install these first:

1. **Node.js LTS** — https://nodejs.org/
2. **MongoDB Atlas account** — https://www.mongodb.com/atlas/database (or a local MongoDB server)
3. **Postman** — https://www.postman.com/downloads/ for testing API requests
4. **Git** — https://git-scm.com/downloads
5. **GitHub account** — https://github.com/

## Setup

1. Download and extract this project.
2. Open the extracted `backend-api` folder in VS Code.
3. Open the VS Code terminal in that folder.
4. Install dependencies:

   ```bash
   npm install
   ```

5. Make a copy of `.env.example` and name the copy `.env`.
6. Open `.env` and replace the sample MongoDB URI with your own Atlas connection string. Set a long, random value for `JWT_SECRET`.
7. Start the development server:

   ```bash
   npm run dev
   ```

8. Visit http://localhost:4000. You should receive a JSON message confirming that the API is running.

> Never upload `.env` to GitHub. It contains your database credentials and JWT secret. The `.gitignore` file excludes it.

## MongoDB Atlas setup

1. Create a free MongoDB Atlas account and a free cluster.
2. Create a database user with a username and strong password. This is separate from your MongoDB website login.
3. In **Network Access**, add your current IP address. Avoid allowing access from everywhere (`0.0.0.0/0`) for a project containing real data.
4. Select **Connect → Drivers → Node.js** and copy the connection string.
5. Replace the username, password and cluster placeholders in `.env`. URL-encode special characters in the database password.
6. Use a database name such as `app_database` in the URI.

## API endpoints

Base URL: `http://localhost:4000/api`

| Method | Endpoint | Auth required | Purpose |
|---|---|---:|---|
| POST | `/users/register` | No | Create an account |
| POST | `/users/login` | No | Log in and receive a JWT |
| POST | `/users/logout` | Yes | Return logout confirmation; delete token client-side |
| GET | `/users/me` | Yes | Get the logged-in user's profile |
| GET | `/posts` | No | Get all posts |
| GET | `/posts/:id` | No | Get one post |
| POST | `/posts` | Yes | Create a post |
| PATCH | `/posts/:id` | Yes | Update your own post |
| DELETE | `/posts/:id` | Yes | Delete your own post |

### Example request bodies

Register (`POST /api/users/register`):

```json
{
  "name": "",
  "email": "user@example.com",
  "password": "change-this-password"
}
```

Login (`POST /api/users/login`):

```json
{
  "email": "user@example.com",
  "password": "change-this-password"
}
```

Create a post (`POST /api/posts`):

```json
{
  "title": "My first backend post",
  "content": "I created this post using my own REST API."
}
```

For protected endpoints, copy the token returned by register/login and set this Postman header:

`Authorization: Bearer YOUR_TOKEN_HERE`

## Postman collection

Import `postman/backend-api.postman_collection.json` into Postman. First register or log in, then copy the returned token into the collection's `token` variable.

## Project structure

```text
backend-api/
├── backend/
│   └── src/
│       ├── config/
│       │   ├── constants.js
│       │   └── database.js
│       ├── controllers/
│       │   ├── post.controller.js
│       │   └── user.controller.js
│       ├── middleware/
│       │   └── auth.middleware.js
│       ├── models/
│       │   ├── post.model.js
│       │   └── user.model.js
│       ├── routes/
│       │   ├── post.route.js
│       │   └── user.route.js
│       ├── app.js
│       └── index.js
├── postman/
│   └── backend-api.postman_collection.json
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Publish to GitHub

Create a repository in your own GitHub account. Suggested repository name: `backend-api`. The project does not contain or depend on anybody else’s GitHub username. After creating the empty repository, run these commands from this project folder:

```bash
git init
git add .
git status
git commit -m "Initial backend project"
git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/backend-api.git
git push -u origin main
```

Replace `REPLACE-WITH-YOUR-USERNAME` with your own GitHub username. This is the only account-specific step; it is intentionally not tied to a pre-existing GitHub account. Check `git status` before committing and make sure `.env` is not listed.

## Learning note

This repository is a learning project, not a production-ready authentication service. The logout endpoint is stateless: a JWT remains valid until expiry unless the client deletes it or you add a server-side token revocation system. For a production application, add rate limiting, stronger input validation, HTTPS, secure token storage, tests, logging and a token-revocation strategy.
