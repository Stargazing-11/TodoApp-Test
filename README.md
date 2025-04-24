# 📝 Full Stack Todo App

A modern full-stack Todo App with user authentication, file uploads, and clean UI using **React + Ant Design + Node.js + MongoDB**. Built as a test project and deployed using **Render** (backend) and **Vercel** (frontend).

---

## 🚀 Live Demo

- 🔗 Frontend: [https://todo-app-test-virid.vercel.app/](https://todo-app-test-virid.vercel.app/)
- 🔗 Backend API: [https://todo-api-qxnf.onrender.com/api/](https://todo-api-qxnf.onrender.com/api/)

---

## 🛠 Tech Stack

**Frontend**
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Ant Design](https://ant.design/)
- Axios

**Backend**
- [Express.js](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [JWT Auth](https://jwt.io/)
- Multer (for file uploads)

**Deployment**
- [Render](https://render.com/) – API
- [Vercel](https://vercel.com/) – Frontend

---

## ✨ Features

- ✅ User authentication (Register / Login with JWT)
- ✅ Create, Edit, Delete todos
- ✅ Upload thumbnail and attachment per todo
- ✅ Preview images and download files
- ✅ Responsive UI with Ant Design
- ✅ Clean folder structure and API separation

---

## 📸 Screenshots
![image](https://github.com/user-attachments/assets/36b1fda2-c2a1-4cc6-ab6a-aaa1e788b72e)
![image](https://github.com/user-attachments/assets/fa44b881-5647-4a06-9189-16af68b26d02)
![image](https://github.com/user-attachments/assets/55ac50e6-88f4-427b-bdc7-db51d24b3727)
![image](https://github.com/user-attachments/assets/dd8e10fc-35a1-4d93-8a93-a447d0a03f2d)
![image](https://github.com/user-attachments/assets/9c244b66-8f72-415c-806e-fc3cea72fc9a)
![image](https://github.com/user-attachments/assets/eb657dba-bc69-46ef-bb0b-09f9f5ae0d81)

---

## 🧑‍💻 Getting Started Locally

### 1. Clone the repo

```bash
git clone https://github.com/Stargazing-11/TodoApp-Test
cd todo-app
```

### 2. Setup the backend

```bash
cd backend
npm install
touch .env
```

Create a `.env` file and add:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/todoapp?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
```

Then:

```bash
npm start
```

### 3. Setup the frontend

```bash
cd ../frontend
npm install
touch .env
```

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Then:

```bash
npm run dev
```

### 4. Database Setup

This project uses **MongoDB Atlas** for cloud-based storage, but you can also use a local MongoDB instance.

### 1. Setup MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (`M0` tier)
3. Add a user, Example:
   - Username: `todo_user`
   - Password: `secure1234`
4. Whitelist IPs: Add `0.0.0.0/0` (Allow from Anywhere)
5. Get your connection URI (example):
   ```
   mongodb+srv://todo_user:secure1234@your-cluster.mongodb.net/todoapp?retryWrites=true&w=majority
   ```

6. Add the URI to your `.env`:
```env
MONGO_URI=mongodb+srv://todo_user:secure1234@cluster.mongodb.net/todoapp?retryWrites=true&w=majority
```

---

### 2. Setup Local MongoDB (Optional)

Install MongoDB locally and run:

```bash
brew services start mongodb-community
```

Then use:

```env
MONGO_URI=mongodb://localhost:27017/todoapp
```

---

### 3. Manually Create a Test User (if needed)

If you want to insert a test user manually (without using the register endpoint), connect to MongoDB and run:

```js
use todoapp

db.users.insertOne({
  email: "test@example.com",
  password: "<bcrypt-hashed-password>",
})
```

> 💡 Password must be **hashed using bcrypt**. You can generate it using this Node.js script:

```js
const bcrypt = require("bcrypt");
bcrypt.hash("yourpassword", 10).then(console.log);
```

Use the generated hash in the `password` field above.

---

## ⚙️ Folder Structure

```
todo-app/
├── backend/
│   ├── routes/
│   ├── models/
│   ├── config/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── context/
│   └── vite.config.js
```

---

## 📄 License

MIT — feel free to fork and build upon!

---

## 🤝 Contributing

PRs and feedback welcome — this was originally built as a test project and I’m always open to improvements!

---

## 🙋‍♂️ Author

- **Samuel Kifle** – https://github.com/Stargazing-11
