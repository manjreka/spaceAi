# spaceAi

# 📝 Task Manager App

A full-stack Task Management application built with **Node.js**, **GraphQL**, and **MongoDB** on the backend, and **Next.js**, **Apollo Client**, and **Tailwind CSS** on the frontend.

Users can create, view, and update tasks with live status filtering, modern UI, and responsive experience.

---

## 📌 Features

- ✅ Create new tasks with title and description
- 🔄 Update task status (`PENDING`, `IN_PROGRESS`, `COMPLETED`)
- 🔍 Filter tasks by status
- 🚀 GraphQL API using Apollo Server
- 🧠 Apollo Client integration on frontend
- 📦 MongoDB for data persistence
- 🎨 Tailwind CSS-based responsive design

---

## 🗂️ Project Structure
task-manager-app/
├── backend/ # GraphQL + MongoDB backend
│ ├── index.js
│ ├── schema/ # GraphQL typeDefs and resolvers
│ └── models/ # MongoDB models
├── frontend/ # Next.js frontend
│ ├── pages/ # Route-based pages
│ ├── components/ # UI components
│ └── graphql/ # GraphQL queries & mutations
└── README.md




---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app


cd backend
npm install

npm start


cd ../frontend
npm install
npm run dev


mutation {
  createTask(title: "Finish project", description: "Complete the task manager app") {
    id
    title
    description
    status
  }
}


{
  "data": {
    "createTask": {
      "id": "664e6d9d60d8df0f953ebfc4",
      "title": "Finish project",
      "description": "Complete the task manager app",
      "status": "PENDING"
    }
  }
}

query {
  tasks {
    id
    title
    description
    status
  }
}


mutation {
  updateTaskStatus(id: "664e6d9d60d8df0f953ebfc4", status: "COMPLETED") {
    id
    title
    status
  }
}

