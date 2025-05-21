# 📝 NoteX – A Modern Note-Taking App

NoteX is a sleek and secure note-taking application designed to help users capture, organize, and access their thoughts instantly. Built with a modern tech stack, it offers a clean interface, fast performance, and essential features like authentication, CRUD operations, and responsive design.

---

## 🚀 Tech Stack

### Frontend

- **React** with **React Router DOM** for SPA navigation
- **Tailwind CSS** for utility-first styling
- **React Hook Form** for form handling
- **React Hot Toast** for notifications
- **Zustand** for lightweight state management
- **Ant Design** for modal components
- **Vite** for fast development and build tooling

### Backend

- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **CORS** and **dotenv** for environment configuration

---

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or cloud instance)

### 1. Clone the Repository

```bash
git clone https://github.com/Avtarsingh97/InspironLabAssignment.git
cd InspironLabAssignment
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET = your jwt secret
JWT_ACCESS_EXPIRATION_DAYS = expires time
VITE_FRONTEND_URL = your frontend url
```

Start the backend server:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

---

## 📡 API Endpoints

### Authentication

- **POST** `/api/auth/signup` – Register a new user
- **POST** `/api/auth/signin` – Authenticate an existing user

### Notes

- **GET** `/api/note` – Retrieve all notes for the authenticated user
- **POST** `/api/note` – Create a new note
- **PUT** `/api/note/:id` – Update an existing note
- **DELETE** `/api/note/:id` – Delete a note

---

## 📸 Screenshots

![NoteX-05-21-2025_05_25_PM](https://github.com/user-attachments/assets/53d4e2b0-07d7-47f8-ba81-b56066bcf86c)
![NoteX-05-21-2025_05_26_PM(1)](https://github.com/user-attachments/assets/b7b601fd-764d-4be4-b44f-0ef9f5ed4bc6)
![NoteX-05-21-2025_05_26_PM](https://github.com/user-attachments/assets/8ad1be76-58d4-45e0-b205-95477cd3f77a)
![NoteX-05-21-2025_05_28_PM](https://github.com/user-attachments/assets/f59a5a44-ee2c-4113-84b9-2edd7566ee9d)
![NoteX-05-21-2025_05_29_PM](https://github.com/user-attachments/assets/a52c4efe-5cce-43a2-91ff-32effe04ebae)
![NoteX-05-21-2025_05_29_PM-1](https://github.com/user-attachments/assets/0f12a203-92c8-4bc6-a73b-d32418123b04)


---

## 📁 Project Structure

```
InspironLabAssignment/
├── backend/
|   ├── config/            
│   ├── controllers/       
│   ├── models/
│   ├── routes/
│   ├── middleware/
|   ├── services/
│   └── index.js
├── frontend/
│   ├── src/
|   |   ├── apiManager/
│   │   ├── components/
|   |   ├── const/
|   |   ├── helper/
│   │   ├── pages/
|   |   ├── routes/
│   │   ├── stores/
│   │   ├── App.jsx
│   │   └── main.jsx
|   ├── index.html
|   ├── package.json
│   └── public/
└──  README.md

```

---

## 📄 License

This project is licensed under the MIT License.
