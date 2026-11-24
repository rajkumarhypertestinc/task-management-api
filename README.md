# task-management-api
# Task Management REST API

A RESTful Task Management API built with **Node.js**, **Express**, and **MongoDB** following an MVC architecture, complete with validation, error handling, and interactive **OpenAPI/Swagger** documentation.

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose ODM
- **Documentation:** Swagger UI (`swagger-ui-express`, `yamljs`)
- **Environment Config:** `dotenv`

---

## Project Structure

```text
task-management-api/
├── config/
│   └── db.js                 # MongoDB connection setup
├── controllers/
│   └── taskcontrollers.js    # CRUD logic & HTTP status handling
├── models/
│   └── taskitem.js           # Mongoose task schema & validation
├── routes/
│   └── taskroutes.js         # Express API routes
├── .env.example              # Sample environment variables
├── .gitignore                # Ignored files (node_modules, .env)
├── package.json
├── README.md
├── server.js                 # Express app & Swagger entry point
└── swagger.yaml              # OpenAPI 3.0 specification
```

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas URI

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd task-management-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Copy `.env.example` to `.env` and update the values if needed:
   ```bash
   cp .env.example .env
   ```
   Example `.env`:
   ```env
   PORT=5001
   MONGODB_URI=mongodb://127.0.0.1:27017/taskcrud
   ```

4. **Start the server:**
   ```bash
   npm start
   ```
   The API will run at `http://localhost:5001`.

---

## API Documentation

Once the server is running, view the interactive Swagger UI documentation in your browser:

```text
http://localhost:5001/api-docs
```

---

## API Endpoints & Status Codes

| Method | Endpoint | Description | Status Codes |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/tasks` | Create a new task | `201`, `400`, `409`, `500` |
| `GET` | `/api/tasks` | Retrieve all tasks | `200`, `500` |
| `GET` | `/api/tasks/:id` | Retrieve a single task by ID | `200`, `400`, `404`, `500` |
| `PUT` | `/api/tasks/:id` | Update an existing task by ID | `200`, `400`, `404`, `409`, `500` |
| `DELETE` | `/api/tasks/:id` | Delete a task by ID | `204`, `400`, `404`, `500` |

### HTTP Status Code Summary
- **`200 OK`** — Request succeeded (GET / PUT)
- **`201 Created`** — Task successfully created (POST)
- **`204 No Content`** — Task successfully deleted (DELETE)
- **`400 Bad Request`** — Missing required fields, invalid enum value, or malformed MongoDB ID
- **`404 Not Found`** — No task found matching the provided valid ID
- **`409 Conflict`** — Duplicate task `title` conflict
- **`500 Internal Server Error`** — Database or unexpected server failure

---

## Sample Request Payload (`POST` / `PUT`)

```json
{
  "title": "Complete API Documentation",
  "description": "Add Swagger UI and README instructions",
  "assignedTo": "Rajkumar",
  "priority": "high",
  "status": "pending"
}
```

### Field Rules
- **`title`** *(String, required, unique)*
- **`description`** *(String, optional)*
- **`assignedTo`** *(String, optional)*
- **`priority`** *(String, enum: `low`, `medium`, `high`)*
- **`status`** *(String, enum: `pending`, `in-progress`, `completed`)*