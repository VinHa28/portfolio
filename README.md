# Portfolio Project (Monorepo)

This is a monorepo for my personal portfolio project, containing both the frontend and backend code.

## 📁 Project Structure

portfolio-project/
├── portfolio-frontend/ # Frontend application (ReactJS / Vite )
├── portfolio-backend/ # Backend application (NodeJS / Express / MongoDB)
├── .gitignore
└── README.md

-   **`portfolio-frontend/`**: Contains the frontend code. Built with [ReactJS](https://reactjs.org/) (or [Vite](https://vitejs.dev/)).
-   **`portfolio-backend/`**: Contains the backend code. Built with [NodeJS](https://nodejs.org/) using [Express](https://expressjs.com/).

---

## 🚀 Getting Started
### 1️⃣ Clone the repository
```bash
git clone https://github.com/VinHa28/portfolio.git
cd portfolio

### 2️⃣ Frontend setup
cd portfolio-frontend
npm install   # or yarn install
npm run dev   # or yarn dev
# By default, the frontend will be available at:
http://localhost:5173/

### 3️⃣ Backend setup
cd portfolio-backend
npm install   # or yarn install
npm run start # or yarn start
# By default, the backend will run at:
http://localhost:5000

### ⚙️ Scripts
## Frontend
npm run dev	#Run development server
npm run build	#Build for production
## Backend
npm run start	#Run backend server
npm run dev	    #Run with hot-reload (if using nodemon)
npm run build	#Build backend code

### 🌐 Deployment
Frontend: You can deploy to Vercel, Netlify, or any static hosting platform (if using React/Vite/NextJS static export).
Backend: You can deploy to Heroku, Render, Railway, or your own VPS/server.

### 📝 Environment Variables
Add a .env file in:
- portfolio-frontend/ for frontend env variables
- portfolio-backend/ for backend env variables
Note: Remember to never commit your .env files. They are ignored in .gitignore.

### 👨‍💻 Author
- Name: Vinh Hà Văn
- GitHub: https://github.com/VinHa28