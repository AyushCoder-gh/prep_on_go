# PrepOnGo

> A full-stack preparation platform that brings quizzes, performance tracking, user management, and administrative question management into a single application.

PrepOnGo is a full-stack web application designed to provide students with a centralized platform for structured preparation and self-assessment.

The platform provides authenticated users with access to practice quizzes, instant performance feedback, quiz history, and performance analytics, while administrators can manage users and maintain the question bank through role-protected administrative functionality.

---

## Overview

Students often rely on multiple disconnected resources while preparing for examinations or technical assessments. PrepOnGo aims to provide a focused preparation environment where users can practice, evaluate their performance, and track their progress from a single platform.

The application follows a client-server architecture with a React frontend, Node.js/Express backend, and PostgreSQL database.

The backend exposes REST APIs protected through JWT-based authentication and role-based authorization.

---

## Key Features

### Student Features

- Secure user authentication
- JWT-based session authentication
- Profile information
- Practice quizzes
- Randomized question selection
- Question category filtering
- Difficulty-based filtering
- Answer selection and progress tracking
- Validation before quiz submission
- Automatic score calculation
- Percentage-based performance evaluation
- Question-level answer feedback
- Correct/incorrect answer highlighting
- Quiz history
- Performance dashboard
- Retry functionality

### Administrator Features

- Protected administrator dashboard
- Role-based access control
- Platform statistics
- User management
- Question bank management
- Create questions
- Edit questions
- Delete questions
- Configure correct answers
- Assign question categories
- Assign question difficulty
- Server-side request validation
- Protected administrative API endpoints

---

## Technology Stack

### Frontend

- React
- Vite
- Axios
- JavaScript (ES6+)
- CSS

### Backend

- Node.js
- Express.js
- REST API
- JSON Web Tokens (JWT)
- Joi validation

### Database

- PostgreSQL
- `pg` Node.js PostgreSQL client

### Development & Testing

- Git
- GitHub
- Bruno
- pgAdmin
- npm

---

## Architecture

PrepOnGo follows a layered client-server architecture.

```text
                         ┌──────────────────────┐
                         │      React Client    │
                         │                      │
                         │  Components          │
                         │  Context             │
                         │  API Layer           │
                         └──────────┬───────────┘
                                    │
                              HTTP / REST
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Express Backend    │
                         │                      │
                         │  Routes              │
                         │  Middleware          │
                         │  Controllers         │
                         │  Validation          │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │     PostgreSQL       │
                         │                      │
                         │ Users                │
                         │ Questions            │
                         │ Quiz Attempts        │
                         └──────────────────────┘
