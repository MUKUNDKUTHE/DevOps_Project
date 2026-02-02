# ProjectBridge

A full-stack web application that bridges the gap between students/colleges and companies by facilitating project collaboration and proposals.

## Project Overview

ProjectBridge is a platform designed to connect:
- **Students & Colleges**: Share and showcase their projects
- **Companies**: Post projects and receive proposals from academic institutions

The application features role-based access control, allowing different user types (Students, Colleges, Companies) to have tailored experiences.

## Tech Stack

### Frontend
- **React** 18.2.0 - UI library
- **React Router DOM** 6.22.3 - Client-side routing
- **Vite** 5.1.4 - Build tool
- **CSS** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** 4.19.2 - Web framework
- **MongoDB** (Mongoose 8.9.1) - Database
- **JWT** 9.0.2 - Authentication
- **Bcryptjs** 2.4.3 - Password hashing
- **CORS** 2.8.5 - Cross-origin resource sharing
- **Nodemon** - Development server auto-reload

## Project Structure

```
ProjectBridge/
├── src/                           # Frontend source code
│   ├── pages/                    # React pages
│   │   ├── Home.jsx
│   │   ├── College.jsx
│   │   ├── Company.jsx
│   │   ├── Projects.jsx
│   │   ├── Proposals.jsx
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── components/               # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProjectCard.jsx
│   │   └── ProjectCard.css
│   ├── api/                      # API configuration
│   │   └── api.js
│   ├── assets/                   # Static assets
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # React entry point
│   └── styles.css                # Global styles
├── public/                        # Public assets
│   └── images/
├── projectbridge-backend/         # Backend source code
│   ├── controllers/              # Business logic
│   │   ├── auth.controller.js
│   │   ├── project.controller.js
│   │   └── proposal.controller.js
│   ├── models/                   # Database schemas
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Proposal.js
│   ├── routes/                   # API routes
│   │   ├── auth.routes.js
│   │   ├── project.routes.js
│   │   └── proposal.routes.js
│   ├── middleware/               # Express middleware
│   ├── server.js                 # Backend entry point
│   ├── .env                      # Environment variables
│   └── package.json
├── index.html                     # HTML entry point
├── package.json                   # Frontend dependencies
├── vite.config.js                # Vite configuration
└── README.md                      # This file
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd ProjectBridge_Frontend_SUPERFINAL
```

#### 2. Setup Backend

```bash
cd projectbridge-backend

# Install dependencies
npm install

# Create .env file and add your environment variables
# DATABASE_URL, JWT_SECRET, PORT, etc.

# Start the backend server
npm start
```

The backend server will run on `http://localhost:5000` (or your configured PORT)

#### 3. Setup Frontend

```bash
# From the root directory
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173` (Vite default)

## Features

### Authentication
- User registration (Students, Colleges, Companies)
- Secure login with JWT tokens
- Role-based access control (RBAC)
- Password hashing with bcryptjs

### Projects
- Create and manage projects
- View all projects or filtered by role
- Project details and descriptions

### Proposals
- Submit proposals for projects
- Track proposal status
- Review and manage proposals

### Role-Based Pages
- **College**: Access college-specific features
- **Company**: Access company-specific features
- **Home**: Landing page for all users

## Authentication Flow

1. User signs up with email, password, and role selection
2. Credentials are validated and password is hashed
3. Upon login, JWT token is generated and stored in localStorage
4. Protected routes check for valid token and user role
5. Token is sent with each API request for authentication

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /profile` - Get current user profile

### Project Routes (`/api/projects`)
- `GET /` - Get all projects
- `POST /` - Create new project
- `GET /:id` - Get project details
- `PUT /:id` - Update project
- `DELETE /:id` - Delete project

### Proposal Routes (`/api/proposals`)
- `GET /` - Get all proposals
- `POST /` - Create new proposal
- `GET /:id` - Get proposal details
- `PUT /:id` - Update proposal status

## Environment Variables

Create a `.env` file in `projectbridge-backend/` with:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd projectbridge-backend
npm start
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Production Build

**Frontend:**
```bash
npm run build
```

## Troubleshooting

### Backend not connecting
- Verify MongoDB is running
- Check `.env` file for correct credentials
- Ensure `JWT_SECRET` is set

### CORS errors
- Backend CORS is configured in `server.js`
- Ensure frontend URL is whitelisted in backend

### Port already in use
- Change the PORT in `.env` file
- Or kill the process using the port

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues or questions, please create an issue in the repository or contact the development team.

---

**Version:** 1.0.0  
**Last Updated:** February 2, 2026
