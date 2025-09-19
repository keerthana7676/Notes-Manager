
# 📚 Notes Manager App

A simple, full-stack application for managing personal notes. Users can register, log in, and perform all standard CRUD (Create, Read, Update, Delete) operations on their private notes.

## ✨ Features

  - **User Authentication:** Secure user registration and login with email and password.
  - **Notes Management:** Add, view, edit, and delete notes.
  - **Personalized Experience:** Each user has their own private collection of notes.
  - **Responsive Design:** A clean, minimalist user interface that works on both desktop and mobile devices.

## ⚙️ Technology Stack

This project is a MERN stack application.

**Frontend:**

  * **React:** A JavaScript library for building user interfaces.
  * **React Router:** For handling client-side routing.
  * **Axios:** A promise-based HTTP client for API requests.

**Backend:**

  * **Node.js:** A JavaScript runtime environment.
  * **Express:** A fast, minimalist web framework for Node.js.
  * **MongoDB:** A NoSQL database for storing user and note data.
  * **Mongoose:** An elegant MongoDB object modeling tool for Node.js.
  * **JWT (JSON Web Tokens):** For secure, token-based authentication.

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

  * Node.js (v14 or higher)
  * npm or yarn
  * MongoDB (running locally or a cloud service like MongoDB Atlas)

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
```

> **Note:** Replace `your-username/your-repository-name.git` with your actual repository URL.

### Step 2: Backend Setup

Navigate to the `backend` directory, install the dependencies, and set up your environment variables.

```bash
cd backend
npm install  # or yarn install
```

Create a `.env` file in the `backend` folder with the following content:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_strong_secret_key_for_jwt
PORT=5000
```

  * **`MONGO_URI`**: Your MongoDB connection string. If you're using MongoDB Atlas, copy it from your cluster settings.
  * **`JWT_SECRET`**: A random, long string to securely sign JWTs.
  * **`PORT`**: The port for your backend server.

Finally, start the backend server:

```bash
npm start
```

The backend will run on `http://localhost:5000` (or your specified port).

### Step 3: Frontend Setup

Open a new terminal, navigate to the `frontend` directory, and install the dependencies.

```bash
cd ../frontend
npm install  # or yarn install
```

To start the frontend development server:

```bash
npm run dev
```

The frontend will open in your browser, typically at `http://localhost:5173`.

## 📄 API Endpoints

The backend provides the following RESTful API endpoints:

**Authentication**

  * `POST /api/auth/register` - Register a new user
  * `POST /api/auth/login` - Login a user and receive a JWT

**Notes**

  * `GET /api/notes` - Get all notes for the logged-in user
  * `POST /api/notes` - Add a new note
  * `PUT /api/notes/:id` - Update a note by its ID
  * `DELETE /api/notes/:id` - Delete a note by its ID

