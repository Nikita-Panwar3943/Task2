# Task Management Web Application

A full-stack task management application built with the MERN stack (MongoDB Atlas, Express.js, React.js, Node.js).

## Features

- **Authentication**: User registration, login, and JWT-based authentication
- **Task Management**: Create, read, update, and delete tasks
- **Task Properties**: Title, description, status, priority, type, and due date
- **Filtering & Sorting**: Filter by status, priority, type and search by title
- **Modern UI**: Responsive design with Tailwind CSS and sidebar navigation
- **Real-time Updates**: Instant task status updates and dashboard statistics

## Tech Stack

### Frontend
- React.js (with Hooks)
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- Heroicons for icons
- Context API for state management

### Backend
- Node.js + Express.js
- MongoDB Atlas (cloud database)
- JWT for authentication
- bcrypt for password hashing
- Mongoose for MongoDB object modeling
- Express Validator for input validation

## Project Structure

```
task2/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   ├── index.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ProtectedRoute.js
    │   │   └── Sidebar.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Dashboard.js
    │   │   ├── Tasks.js
    │   │   └── AddTask.js
    │   ├── App.js
    │   └── index.js
    ├── public/
    └── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account

### 1. Clone the Repository
```bash
git clone <repository-url>
cd task2
```

### 2. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file and add your environment variables:
```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

### 4. MongoDB Atlas Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user with read/write permissions
4. Whitelist your IP address (0.0.0.0/0 for development)
5. Get your connection string and add it to the `.env` file

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Tasks
- `POST /api/tasks` - Create a new task (protected)
- `GET /api/tasks` - Get all tasks for authenticated user (protected)
- `GET /api/tasks/:id` - Get a single task (protected)
- `PUT /api/tasks/:id` - Update a task (protected)
- `DELETE /api/tasks/:id` - Delete a task (protected)

## Task Status Colors

- **Pending**: Gray
- **In Progress**: Blue
- **Completed**: Green
- **On Hold**: Yellow
- **Cancelled**: Red

## Task Priority Levels

- **Low**: Green
- **Medium**: Yellow
- **High**: Red

## Task Types

- Personal
- Work
- Study
- Other

## Usage

1. **Register**: Create a new account with your full name, email, and password
2. **Login**: Sign in with your credentials
3. **Dashboard**: View task statistics and recent tasks
4. **Add Task**: Create new tasks with title, description, status, priority, type, and due date
5. **Manage Tasks**: View all tasks, filter, sort, search, edit, and delete tasks

## Development

### Running in Development Mode

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm start
```

### Building for Production

Frontend:
```bash
cd frontend
npm run build
```

Backend:
```bash
cd backend
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit your changes
5. Push to the branch
6. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please create an issue in the repository.
