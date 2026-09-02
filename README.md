# Course Selling Website

A backend API for a course-selling platform built with Node.js, Express, MongoDB, and JWT authentication. The project supports both user and admin workflows for sign up, sign in, course creation, and course purchase tracking.

## Features

- User signup and signin
- Admin signup and signin
- JWT-based authentication for users and admins
- Course creation by admin
- Course purchase tracking
- MongoDB integration using Mongoose
- RESTful API endpoints grouped by user, admin, and course routes

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- dotenv for environment configuration

## Project Structure

```bash
.
├── db.js
├── index.js
├── package.json
├── README.md
├── middleware/
│   ├── admin.js
│   └── user.js
├── router/
│   ├── admin.js
│   ├── courses.js
│   └── user.js
└── utils/
    └── config.js
```

## Prerequisites

Before running the project, make sure you have:

- Node.js installed
- MongoDB running locally or a MongoDB Atlas connection string
- A `.env` file configured with the required variables

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGO_URL=mongodb://localhost:27017/course-selling-website
JWT_USER_SECRET=your_user_jwt_secret
JWT_ADMIN_SECRET=your_admin_jwt_secret
```

## Installation

```bash
git clone https://github.com/rishir143/Course-selling-website.git
cd Course-selling-website
npm install
```

## Run the Project

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server will start on the port defined in your `.env` file.

## API Endpoints

### User Routes

- `POST /api/v1/user/signup` - Register a new user
- `POST /api/v1/user/signin` - Login a user
- `GET /api/v1/user/purchases` - Get a user's purchased courses

### Admin Routes

- `POST /api/v1/admin/signup` - Register a new admin
- `POST /api/v1/admin/signin` - Login an admin
- `POST /api/v1/admin/courses` - Create a new course

### Course Routes

- `GET /api/v1/course/preview` - Preview all courses
- `POST /api/v1/course/purchases` - Purchase course endpoint

## Notes

- Passwords are hashed using `bcrypt` before saving.
- JWT tokens are used to protect authenticated routes.
- This project is a backend API only; there is no frontend included in the repository.

## Future Improvements

- Add course listing and course details endpoints
- Add payment integration
- Add admin-only course management features
- Add user profile and course enrollment details
- Add validation and error handling improvements
