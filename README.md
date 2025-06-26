# 🌟 Portfolio Project

A full-stack portfolio website showcasing my projects and skills, built with modern web technologies.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Scripts](#️-scripts)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [Author](#-author)

## ✨ Features

- **Responsive Design**: Works seamlessly across all devices
- **Modern UI/UX**: Clean and professional interface
- **Full-Stack Architecture**: Separate frontend and backend services
- **Fast Performance**: Optimized for speed and user experience
- **Easy Deployment**: Ready for production deployment

## 🛠 Tech Stack

**Frontend:**
- React.js / Next.js
- Vite (Build tool)
- Modern CSS/Tailwind CSS

**Backend:**
- Node.js
- Express.js
- RESTful API architecture

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## 📦 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/VinHa28/portfolio.git
cd portfolio
```

### 2️⃣ Frontend Setup

```bash
cd portfolio-frontend
npm install   # or yarn install
npm run dev   # or yarn dev
```

The frontend will be available at: **http://localhost:5173/**

### 3️⃣ Backend Setup

```bash
cd portfolio-backend
npm install   # or yarn install
npm run start # or yarn start
```

The backend will run at: **http://localhost:5000**

## ⚙️ Scripts

### Frontend Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run development server with hot-reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

### Backend Scripts

| Command | Description |
|---------|-------------|
| `npm run start` | Run backend server |
| `npm run dev` | Run with hot-reload (nodemon) |
| `npm run build` | Build backend code |

## 🔧 Environment Variables

Create `.env` files in the respective directories:

### Frontend Environment Variables
Create `portfolio-frontend/.env`:
```env
VITE_API_URL=http://localhost:5000
VITE_APP_TITLE=My Portfolio
```

### Backend Environment Variables
Create `portfolio-backend/.env`:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
ACCESS_TOKEN_LIFE=access_token_life_time
JWT_REFRESH_SECRET=your_jwt_secret
EMAIL_USER=youremail@example.com
EMAIL_PASS=your_email_password(or app password)
```

> **⚠️ Important:** Never commit your `.env` files to version control. They are already included in `.gitignore`.

## 🌐 Deployment

### Frontend Deployment
Deploy to any of these platforms:
- **[Vercel](https://vercel.com/)** (Recommended for React/Next.js)
- **[Netlify](https://netlify.com/)**
- **[GitHub Pages](https://pages.github.com/)**
- Any static hosting platform

### Backend Deployment
Deploy to:
- **[Heroku](https://heroku.com/)**
- **[Render](https://render.com/)**
- **[Railway](https://railway.app/)**
- Your own VPS/server

## 📁 Project Structure

```
portfolio/
├── portfolio-frontend/          # Frontend application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── portfolio-backend/           # Backend application
│   ├── src/
│   ├── routes/
│   ├── models/
│   ├── package.json
│   └── server.js
├── README.md
└── .gitignore
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Vinh Hà Văn**
- GitHub: [@VinHa28](https://github.com/VinHa28)
- Email: [vinhhv28@gmail.com](mailto:vinhhv28@gmail.com)

---

⭐ If you found this project helpful, please give it a star on GitHub!

## 🙏 Acknowledgments

- Thanks to all contributors who helped improve this project
- Inspired by modern portfolio designs and best practices
- Built with ❤️ using modern web technologies
