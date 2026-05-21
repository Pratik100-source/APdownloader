# AP Downloader

AP Downloader is a full-stack video downloader interface. The frontend provides a clean workflow for pasting a public video URL, navigating account pages, and preparing the download experience. The backend is an Express server prepared for MongoDB persistence through Mongoose.

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- React Router
- Express
- MongoDB with Mongoose
- Nodemon
- ESLint

## Project Structure

```text
APdownloader/
  backend/
    config/
      dbconfig.js
    .env
    package.json
    server.js
  src/
    assets/
    pages/
      home.jsx
      login.jsx
      signup.jsx
    routes/
      AppRoutes.jsx
    App.jsx
    main.jsx
  eslint.config.js
  package.json
  vite.config.js
```

## Getting Started

Install dependencies from the project root:

```bash
npm install
```

Create a backend environment file:

```text
backend/.env
```

Example:

```env
PORT=3002
MONGO_URI=your_mongodb_connection_string
```

## Running The App

Start the frontend:

```bash
npm run dev
```

Start the backend:

```bash
npm run server
```

By default, the backend uses the `PORT` value from `backend/.env`, or falls back to `3000`.

## Available Scripts

```bash
npm run dev
```

Starts the Vite frontend development server.

```bash
npm run server
```

Starts the Express backend with Nodemon.

```bash
npm run build
```

Builds the frontend for production.

```bash
npm run preview
```

Previews the production frontend build locally.

```bash
npm run lint
```

Runs ESLint across the project.

## Routes

Frontend routes are defined in:

```text
src/routes/AppRoutes.jsx
```

Current routes:

```text
/         Home page
/login    Login page
/signup   Signup page
```

The router provider is configured in:

```text
src/main.jsx
```

## Backend

The backend entry point is:

```text
backend/server.js
```

It currently:

- loads environment variables from `backend/.env`
- connects to MongoDB using `backend/config/dbconfig.js`
- enables CORS
- starts an Express server

The backend folder has its own `package.json` with:

```json
{
  "type": "commonjs"
}
```

This allows backend files to use CommonJS syntax such as:

```js
const express = require("express");
```

while the root frontend project can continue using ES modules.

## Notes

- Frontend environment variables for Vite must start with `VITE_`.
- Backend secrets belong in `backend/.env`.
- The actual video download API logic is not implemented yet; the current UI is ready for connecting backend endpoints.
