# 🧠 ThinkBoard

<div align="center">

![ThinkBoard Logo](https://img.shields.io/badge/ThinkBoard-AI%20Powered%20Notes-6366f1?style=for-the-badge&logo=brain&logoColor=white)

**The Next-Generation Note-Taking Experience with AI Superpowers** 🚀

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-thinkboardd.netlify.app-success?style=for-the-badge)](https://thinkboardd.netlify.app)
[![Backend](https://img.shields.io/badge/🔗_API-think--board.vercel.app-blue?style=for-the-badge)](https://think-board-git-main-dhiren507s-projects.vercel.app)

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=flat&logo=google&logoColor=white)

</div>

---

## ✨ What Makes ThinkBoard Special?

ThinkBoard isn't just another note-taking app. It's your **AI-powered thinking companion** that transforms how you capture, organize, and interact with your ideas. Built with cutting-edge technology and a passion for productivity.

### 🎯 Key Features

| Feature | Description | Status |
|---------|-------------|--------|
| 🤖 **AI Writing Assistant** | Powered by Google Gemini for intelligent content generation | ✅ Live |
| 💬 **ThinkMate Chat** | Your personal AI companion for brainstorming and ideation | ✅ Live |
| 📱 **Mobile-First Design** | Seamless experience across all devices | ✅ Live |
| 🔐 **Secure Authentication** | JWT-based authentication with password hashing | ✅ Live |
| ⚡ **Real-time Operations** | Lightning-fast CRUD operations | ✅ Live |
| 🎨 **Dark/Light Themes** | Beautiful themes that adapt to your preference | ✅ Live |
| 🛡️ **Rate Limiting** | Smart rate limiting with Redis for optimal performance | ✅ Live |
| 📝 **Rich Text Formatting** | Support for bold text and structured content | ✅ Live |

---

## 🚀 Live Demo

**Frontend:** [https://thinkboardd.netlify.app](https://thinkboardd.netlify.app)  
**Backend API:** [https://think-board-git-main-dhiren507s-projects.vercel.app](https://think-board-git-main-dhiren507s-projects.vercel.app)

### Test Credentials
```
Email: demo@thinkboard.com
Password: demo123
```
*Note: Feel free to create your own account!*

---

## 🛠️ Tech Stack

### Frontend Magic ✨
- **React 18** - Modern React with hooks and context
- **Vite** - Lightning-fast build tool
- **TailwindCSS + DaisyUI** - Beautiful, responsive design system
- **Lucide React** - Gorgeous icon library
- **React Router** - Smooth navigation
- **Axios** - HTTP client with interceptors
- **React Hot Toast** - Delightful notifications

### Backend Power 💪
- **Node.js + Express.js** - Robust server architecture
- **MongoDB + Mongoose** - Flexible NoSQL database
- **JWT Authentication** - Secure token-based auth
- **Bcrypt** - Password hashing and security
- **Helmet + CORS** - Security middleware
- **Google Gemini AI** - Advanced AI integration
- **Upstash Redis** - High-performance rate limiting

### DevOps & Deployment 🌐
- **Vercel** - Backend deployment
- **Netlify** - Frontend deployment
- **MongoDB Atlas** - Cloud database
- **GitHub** - Version control
- **Environment Variables** - Secure configuration

---

## 🎨 Screenshots

<div align="center">

### 🏠 Dashboard
*Clean, intuitive interface with your notes at a glance*

### 📝 Create Notes with AI
*Gemini AI helps you write better content*

### 💬 ThinkMate Chat
*Your AI brainstorming partner*

### 📱 Mobile Responsive
*Perfect experience on any device*

</div>

---

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account
- Google AI Studio account (for Gemini API)
- Upstash Redis account

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ThinkBoard.git
cd ThinkBoard
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_google_gemini_api_key
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
NODE_ENV=development
PORT=3000
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:3000
```

Start the frontend:
```bash
npm run dev
```

### 4. Open Your Browser
Navigate to `http://localhost:5173` and start thinking! 🧠

---

## 📁 Project Structure

```
ThinkBoard/
├── 🗂️ backend/
│   ├── 📄 server.js              # Express server entry point
│   ├── 🔧 config/
│   │   └── upstash.js           # Redis configuration
│   ├── 🎮 controller/
│   │   ├── auth.controller.js   # Authentication logic
│   │   ├── notes.controller.js  # Notes CRUD operations
│   │   ├── ai.controller.js     # Gemini AI integration
│   │   └── thinkmate.controller.js # Chat AI logic
│   ├── 🗄️ database/
│   │   └── db.js               # MongoDB connection
│   ├── 🛡️ middleware/
│   │   ├── auth.middleware.js  # JWT verification
│   │   ├── rateLimiter.js     # Redis rate limiting
│   │   └── errorHandler.js    # Global error handling
│   ├── 📊 models/
│   │   ├── user.model.js      # User schema
│   │   └── notes.model.js     # Notes schema
│   └── 🛣️ routes/
│       ├── auth.routes.js     # Authentication endpoints
│       ├── notes.routes.js    # Notes endpoints
│       ├── ai.routes.js       # AI generation endpoints
│       └── health.routes.js   # Health check
│
├── 🎨 frontend/
│   ├── 📄 index.html            # Main HTML template
│   ├── 📱 src/
│   │   ├── 🎯 App.jsx           # Main app component
│   │   ├── 🧩 components/
│   │   │   ├── Navbar.jsx       # Navigation with mobile menu
│   │   │   ├── NoteCard.jsx     # Individual note display
│   │   │   ├── ThemeToggle.jsx  # Dark/light mode switch
│   │   │   └── ...             # Other reusable components
│   │   ├── 🌐 context/
│   │   │   └── AuthContext.jsx  # Global auth state
│   │   ├── 📚 lib/
│   │   │   ├── axios.js         # HTTP client setup
│   │   │   └── utils.js         # Utility functions
│   │   └── 📖 pages/
│   │       ├── HomePage.jsx     # Dashboard
│   │       ├── CreatePage.jsx   # Note creation with AI
│   │       ├── ThinkMateChat.jsx # AI chat interface
│   │       └── ...             # Other pages
│   └── 🎨 styles/
│       └── index.css           # Global styles
│
└── 📋 Configuration Files
    ├── vercel.json             # Vercel deployment config
    ├── netlify.toml           # Netlify deployment config
    └── package.json           # Project dependencies
```

---

## 🔮 AI Features Deep Dive

### 🤖 Gemini AI Writing Assistant
- **Smart Content Generation**: Describe what you want to write, and Gemini creates it
- **Context-Aware**: Understands your writing style and preferences
- **Seamless Integration**: Generated content flows naturally into your notes

### 💬 ThinkMate Chat
- **Brainstorming Partner**: Bounce ideas off your AI companion
- **Research Assistant**: Get help with complex topics
- **Creative Inspiration**: Overcome writer's block with AI suggestions

---

## 🌟 Advanced Features

### 🔐 Security & Performance
- **JWT Authentication** with secure token management
- **Password Hashing** using bcrypt
- **Rate Limiting** with Redis to prevent abuse
- **CORS Protection** for secure cross-origin requests
- **Helmet.js** for additional security headers

### 📱 User Experience
- **Responsive Design** that works on all devices
- **Dark/Light Theme** toggle
- **Real-time Feedback** with toast notifications
- **Loading States** for better user experience
- **Error Boundaries** for graceful error handling

### ⚡ Performance Optimizations
- **Lazy Loading** for optimal bundle size
- **Memoization** for expensive computations
- **Efficient State Management** with React Context
- **Optimized Database Queries** with MongoDB aggregation

---

## 🚀 Deployment

### Backend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy with zero configuration

### Frontend (Netlify)
1. Build the React app
2. Connect repository to Netlify
3. Configure build settings
4. Deploy with continuous integration

---

## 🤝 Contributing

We love contributions! Here's how you can help make ThinkBoard even better:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### 💡 Ideas for Contributions
- 🎨 New themes and UI improvements
- 🤖 Additional AI integrations
- 📱 Mobile app development
- 🔧 Performance optimizations
- 📖 Documentation improvements

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Dhiren** - *Full Stack Developer & AI Enthusiast*

- 🌐 Portfolio: [Your Portfolio](https://yourportfolio.com)
- 💼 LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- 🐦 Twitter: [@YourTwitter](https://twitter.com/yourhandle)
- 📧 Email: your.email@example.com

---

## 🙏 Acknowledgments

- **Google Gemini** for providing amazing AI capabilities
- **MongoDB Atlas** for reliable database hosting
- **Vercel & Netlify** for seamless deployment
- **Upstash** for high-performance Redis
- **Open Source Community** for incredible tools and libraries

---

<div align="center">

### 🌟 Star this repository if you found it helpful!

**Made with ❤️ and lots of ☕**

*ThinkBoard - Where Ideas Come to Life* ✨

---

**🚀 Ready to revolutionize your note-taking? [Start using ThinkBoard now!](https://thinkboardd.netlify.app)**

</div>
