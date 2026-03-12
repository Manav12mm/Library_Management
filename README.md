# Library Management System Backend

This project serves as the backend for a Library Management System built with Node.js, Express, and MongoDB. It fulfils the MSE-1 Examination requirements for the "AI Driven Full Stack Development" course.

## Installation and Setup

1. Make sure you have Node.js and MongoDB installed/setup.
2. Clone this repository to your local machine.
3. In the project root, open a terminal and run:
   ```bash
   npm install
   ```

4. You should see a `.env` file that contains:
   ```
   MONGO_URI=<Your_MongoDB_Atlas_URI>
   PORT=5000
   ```

5. Run the server:
   ```bash
   node server.js
   ```

## API Documentation

- `POST /books`: Add a new book
- `GET /books`: Get all books
- `GET /books/:id`: Get book by ID
- `PUT /books/:id`: Update book details
- `DELETE /books/:id`: Delete a book
- `GET /books/search?title=xyz`: Search books by title

## Deployment to Render and GitHub

1. Commit and push this folder to your GitHub repository.
2. Go to [Render](https://render.com/), create a "New Web Service".
3. Sign in to GitHub and link the repository.
4. Add your Environment Variable: `MONGO_URI`.
5. Set build command to `npm install` and start command to `node server.js`.
6. Deploy!
