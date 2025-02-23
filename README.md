# 📝  Todo Application

This project is a **Todo application** with a **ReactJS frontend** and a **Node.js + Express + MongoDB backend**. Below are the setup instructions for each part.

---

## 📌 Table of Contents
1. [Backend Setup](#-backend-setup-nodejs--express--mongodb)
2. [Frontend Setup](#-frontend-setup-reactjs--tailwindcss)

---

## 🛠️ Project Structure

```
/Catalog-Application
│
├── /frontend                # Frontend (React)
│   ├── /public
│   ├── /src
│   │   ├── /components      # Reusable components
│   │   │   ├── AddTodo.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Registration.tsx
│   │   │   ├── Validation.tsx
│   │   ├── /context         # Context API for global state management
│   │   │   ├── ApiContext.js
│   │   ├── /utils           # Routes
│   │   │   ├── AppRoutes.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   ├── package.json
│
├── /server                # Backend (Node.js + Express)
│   ├── /src
|   ├── dotenv.js
│   │   ├── /database       # Database connection
│   │   │   ├── db.js
│   │   ├── /models        # Mongoose models
│   │   │   ├── TaskModel.js
│   │   │   ├── UserModel.js
│   │   ├── /routes        # API routes
│   │   ├── Task-routes
│   │   ├── User-routes
│   │   ├── index.js       # Main server entry
│   ├── package.json
│
└── README.md              # Project documentation

```

## 📋 API Endpoints

| Method | Endpoint         | Description            |
| ------ | ---------------- | ---------------------- |
| POST   | `/registration`  | User registration      |
| POST   | `/login`         | User login             |
| POST   | `/input`         | Create a new task      |
| PUT    | `/EditTask`      | Edit an existing task  |
| GET    | `/getAllTheTask` | Retrieve all tasks     |
| DELETE | `/DeleteTask`    | Delete a task          |

---

## 🚀 Backend Setup (Node.js + Express + MongoDB)

### **1️⃣ Install Dependencies**
Navigate to the `backend` directory and install required dependencies:

```
cd backend
npm install
```

### **2️⃣ Setup Environment Variables**
Create a .env file inside the backend directory and add the following:
```
PORT=any_port_number
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key 
```

### **3️⃣ Start the Backend Server**
```
npm start
```

## 🎨 Frontend Setup (ReactJS)

### **1️⃣ Install Dependencies**
Navigate to the frontend directory and install dependencies:
```
cd frontend
npm install
```

### **2️⃣ Start the Frontend**
```
npm start
```
