# TodoList App

A full-stack Todo List application built with **Express**, **MongoDB Atlas**, **React**, and **Redux Toolkit**.

## Deployment

Frontend (https://my-to-do-app-blue.vercel.app/)

Backend  (https://my-to-do-app-g37h.onrender.com/api/todos)

## Features

- Add, toggle, and delete individual tasks
- Mark all tasks as done
- Delete all tasks
- Persist tasks in MongoDB
- CORS configured to allow requests from frontend
- Responsive UI with React and Redux Toolkit for state management
- Toast notifications for user actions

## Tech Stack

- **Backend:** Node.js, Express, Mongoose, MongoDB, CORS
- **Frontend:** React, Redux Toolkit, Axios, React Toastify, Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB instance (local or cloud)
- Yarn or npm
- Git

### Backend Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/MEETparmar230/My-To-do-app
   cd Backend


2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the Backend folder with:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

4. Start the server:

```bash
npm run dev
```

Server runs on http://localhost:5000 by default.


### Frontend Setup

1. Navigate to frontend folder (if separate):

```bash
cd ../To-Do-List
```

2. Install dependencies:

```bash
npm install
```

3. Create .env file in frontend with:

```bash
VITE_API_URL=http://localhost:5000
```

4. Start the frontend:

```bash
npm run dev
```


## API Endpoints


| Method | Endpoint              | Description                |
| ------ | --------------------- | -------------------------- |
| GET    | `/api/todos`          | Fetch all todos            |
| POST   | `/api/todos`          | Add a new todo             |
| PUT    | `/api/todos/:id`      | Toggle a todo's completion |
| PUT    | `/api/todos/mark-all` | Mark all todos as done     |
| DELETE | `/api/todos/:id`      | Delete a todo              |
| DELETE | `/api/todos`          | Delete all todos           |


# CORS Configuration

Backend is configured to allow requests from:

    http://localhost:5173 (frontend development)

    https://my-to-do-app-blue.vercel.app (production frontend URL)


# License

MIT © Meet parmar


# Acknowledgements

Redux Toolkit

React Toastify

Express

Mongoose

Tailwind CSS
