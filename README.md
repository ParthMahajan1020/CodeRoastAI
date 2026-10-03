# 🔥 CodeRoast AI

> **Get your code reviewed by a sarcastic AI.**

CodeRoast AI is a full-stack AI-powered code review application that analyzes your code and gives you a humorous yet useful review.

I built this project mainly as a **practical learning project to test and strengthen my knowledge of full-stack development, APIs, AI integration, deployment, and production-level frontend-backend communication.**

Instead of building another basic CRUD application, I wanted to understand how different technologies work together in a real-world project.

---

## 🚀 Live Demo

🌐 **Frontend:** `YOUR_VERCEL_URL`

⚙️ **Backend:** `YOUR_RENDER_URL`

> Replace the above URLs after deployment.

---

## 📸 About The Project

CodeRoast AI allows users to:

- Select a programming language
- Paste their source code
- Send the code to an AI-powered backend
- Receive a code quality score
- Get a sarcastic roast of their code
- See detected issues
- Get suggestions for improvement

The main purpose of this project was not just to create an AI wrapper, but to gain practical experience with the complete development and deployment workflow.

---

## 🎯 Why I Built This

I built CodeRoast AI to practically test my understanding of:

- Full-stack development
- React frontend development
- Node.js and Express backend development
- REST API creation
- Third-party API integration
- AI API integration
- Frontend ↔ Backend communication
- JSON data handling
- Error handling
- Environment variables
- API key security
- Git and GitHub
- Production deployment
- Deploying frontend and backend separately

This project helped me understand how a project moves from:

```text
Idea
  ↓
Frontend
  ↓
Backend
  ↓
API Integration
  ↓
Testing
  ↓
GitHub
  ↓
Deployment
  ↓
Production Application
````

---

## ✨ Features

### 💻 Code Editor

Users can paste their source code into the editor and select the programming language.

### 🤖 AI Code Review

The backend sends the submitted code to an AI model and receives an analysis.

### 🔥 Code Roast

The AI provides a humorous roast of the submitted code while keeping the feedback constructive.

### 📊 Code Score

The submitted code receives a score from **1–10** based on the AI's analysis.

### ⚠️ Issue Detection

The application displays potential problems found in the submitted code.

### 💡 Improvement Suggestions

The AI provides suggestions that can help improve the submitted code.

### 📋 Copy Results

Users can copy the generated roast, issues, and suggestions.

### 🔄 Try Again

Users can reset the application and analyze another piece of code.

### 📱 Responsive UI

The interface is designed to work across different screen sizes.

---

# 🛠️ Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* Lucide React
* React Markdown
* JavaScript

## Backend

* Node.js
* Express.js
* CORS
* dotenv
* REST API

## AI

* Groq API
* `openai/gpt-oss-120b`

## Development & Deployment

* Git
* GitHub
* Vercel
* Render
* Environment Variables

---

# 🏗️ Project Architecture

```text
                         ┌─────────────────────┐
                         │       User          │
                         │  Enters Source Code │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   React Frontend    │
                         │      Vercel         │
                         └──────────┬──────────┘
                                    │
                              HTTPS Request
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │  Express Backend    │
                         │       Render        │
                         └──────────┬──────────┘
                                    │
                              API Request
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     Groq API        │
                         │     AI Model        │
                         └──────────┬──────────┘
                                    │
                              AI Response
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │  Express Backend    │
                         └──────────┬──────────┘
                                    │
                              JSON Response
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   React Frontend    │
                         │ Display AI Review   │
                         └─────────────────────┘
```

---

# 📁 Project Structure

```text
CodeRoastAI/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .gitignore
│
├── frontend/
│   └── frontend-react/
│       ├── src/
│       │   ├── App.jsx
│       │   ├── main.jsx
│       │   └── index.css
│       │
│       ├── index.html
│       ├── package.json
│       └── vite.config.js
│
└── README.md
```

---

# ⚙️ How It Works

### 1. User enters code

The user selects a programming language and enters their source code.

### 2. Frontend sends API request

The React frontend sends the code and selected language to the backend.

```text
POST /api/roast
```

Example request:

```json
{
  "language": "JavaScript",
  "code": "console.log('Hello World');"
}
```

### 3. Backend processes the request

The Express server receives the request and creates a prompt for the AI model.

### 4. AI analyzes the code

The backend sends the prompt to the Groq API.

### 5. AI returns structured data

The application expects a response containing:

```json
{
  "roast": "Your roast here",
  "score": 7,
  "issues": [
    "Issue 1",
    "Issue 2"
  ],
  "suggestions": [
    "Suggestion 1",
    "Suggestion 2"
  ]
}
```

### 6. Frontend displays the result

The React application receives the JSON response and displays the roast, score, issues, and suggestions.

---

# 🔌 API

## `POST /api/roast`

Analyzes submitted source code using the AI API.

### Request

```json
{
  "language": "JavaScript",
  "code": "const x = 10;"
}
```

### Response

```json
{
  "result": {
    "roast": "This code is so simple...",
    "score": 8,
    "issues": [
      "Variable naming could be improved."
    ],
    "suggestions": [
      "Use a more descriptive variable name."
    ]
  }
}
```

---

# 🔐 Environment Variables

The backend requires a Groq API key.

Create a `.env` file inside the `backend` folder:

```env
GROQ_API_KEY=YOUR_GROQ_API_KEY
PORT=5000
```

The frontend uses the backend API URL.

For local development, the application can use:

```env
VITE_API_URL=http://127.0.0.1:5000/api/roast
```

For production, configure the deployed backend URL:

```env
VITE_API_URL=https://YOUR-BACKEND-URL/api/roast
```

> **Important:** Never upload your real API key to GitHub.

---

# 🧑‍💻 Run Locally

## 1. Clone the Repository

```bash
git clone https://github.com/ParthMahajan1020/CodeRoastAI.git
```

```bash
cd CodeRoastAI
```

---

## 2. Setup Backend

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env`:

```env
GROQ_API_KEY=YOUR_GROQ_API_KEY
PORT=5000
```

Start the backend:

```bash
npm start
```

For development:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

---

## 3. Setup Frontend

Open another terminal.

```bash
cd frontend/frontend-react
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will usually run on:

```text
http://localhost:5173
```

---

# 🌐 Deployment

The project uses separate deployments for the frontend and backend.

```text
Frontend → Vercel

Backend → Render

AI API → Groq
```

## Frontend Deployment

The React frontend can be deployed using Vercel.

Recommended settings:

```text
Root Directory:
frontend/frontend-react

Build Command:
npm run build

Output Directory:
dist
```

Add the environment variable:

```text
VITE_API_URL=https://YOUR-BACKEND-URL/api/roast
```

---

## Backend Deployment

The Express backend can be deployed using Render.

Recommended settings:

```text
Root Directory:
backend

Build Command:
npm install

Start Command:
npm start
```

Add the environment variable:

```text
GROQ_API_KEY=YOUR_GROQ_API_KEY
```

The backend should listen on the port provided by the deployment platform.

---

# 🔒 Security

API keys are stored using environment variables rather than being directly written into the source code.

The `.env` file should never be committed to GitHub.

Example `.gitignore`:

```gitignore
node_modules/
.env
```

---

# 🧪 What I Learned

This project helped me understand several concepts beyond just writing frontend code.

### Frontend

* React state management
* Controlled inputs
* API requests
* Loading states
* Error handling
* Dynamic UI rendering
* Responsive design
* Markdown rendering

### Backend

* Express server setup
* REST API routes
* Request/response handling
* CORS
* Environment variables
* Error handling
* Third-party API integration

### AI Integration

* Sending prompts to an AI API
* Working with AI-generated responses
* Requesting structured JSON responses
* Parsing AI responses
* Handling invalid AI responses

### Deployment

* Git/GitHub workflow
* Deploying a React application
* Deploying an Express server
* Connecting deployed frontend and backend
* Production environment variables
* Understanding frontend/backend deployment architecture

---

# 🧠 Main Purpose of the Project

CodeRoast AI was created as a **knowledge-testing project**.

Rather than focusing on building a large production product, I wanted to take the concepts I had learned and connect them together into one working application.

The project gave me practical experience with:

```text
React
   +
Express
   +
REST API
   +
AI API
   +
Environment Variables
   +
Git/GitHub
   +
Deployment
```

This helped me understand how these individual technologies work together in a complete full-stack application.

---

# 🔮 Future Improvements

Some features that could be added in future versions:

* [ ] User authentication
* [ ] Save previous code reviews
* [ ] Review history
* [ ] Multiple AI models
* [ ] Code comparison
* [ ] GitHub repository integration
* [ ] Direct GitHub code analysis
* [ ] Syntax highlighting
* [ ] More programming languages
* [ ] Detailed code quality metrics
* [ ] Database integration
* [ ] User dashboard
* [ ] Shareable code reviews

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

### Fork the repository

```bash
git fork
```

### Create a new branch

```bash
git checkout -b feature/your-feature
```

### Commit your changes

```bash
git add .
git commit -m "Add new feature"
```

### Push the branch

```bash
git push origin feature/your-feature
```

Then create a Pull Request.

---

# 📄 License

This project is created for **learning and educational purposes**.

---

# 👨‍💻 Author

*Parth Mahajan*  
- BTech Student | Full-Stack Web Development & DSA
- LinkedIn: https://www.linkedin.com/in/parth-mahajan1020/
- GitHub: https://github.com/ParthMahajan1020  
- Email: parth.mahajan1020@example.com  
- Passionate about building console applications, learning new programming languages, and exploring software projects.

---

<p align="center">

### 🔥 CodeRoast AI

**Write code. Get roasted. Learn something.**

</p>

