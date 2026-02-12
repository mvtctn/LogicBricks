# 🧱 LogicBricks - AI-Powered No-Code Backend Builder

LogicBricks is a modern, visual development platform designed to build, test, and deploy production-ready backend logic using natural language. Built with **Next.js 15**, **React Flow**, and **AI-driven code generation**, it allows developers to create complex serverless workflows without writing manual boilerplate.

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: v18.x or higher
- **Package Manager**: npm or yarn
- **Supabase**: Account and project set up (optional for local demo)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/LogicBricks.git

# Navigate to project directory
cd LogicBricks

# Install dependencies
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and add your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
# API Key for logic generation (will be stored in localStorage via UI)
```

### 4. Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the application.

---

## 🛠 Project Structure

- `src/app`: Next.js App Router (Landing, Dashboard, Editor, Docs)
- `src/components`: UI components (Shadcn UI + Custom Editor components)
- `src/store`: Global state management using **Zustand** (Flow engine logic)
- `src/lib`: Utilities and database client configurations
- `src/hooks`: Custom React hooks for theme and state interactions

---

## 🧩 Usage Guide

### Building a Flow
1. **The Canvas**: Drag `Start`, `Process`, and `End` nodes from the left sidebar.
2. **AI Logic**: Select a **Process Node**, enter a prompt (e.g., *"Filter users over age 20"*), and click **Compile**.
3. **Execution**: Use the **Test Lab** (right sidebar) to provide JSON input and run the simulation.
4. **Deployment**: Click **Deploy** to generate a live API endpoint for your logic.

---

## ⬆️ Git Workflow & Deployment

### Pushing Changes
When you have made changes and want to sync with GitHub:

```bash
# 1. Check status
git status

# 2. Stage changes
git add .

# 3. Commit with a meaningful message
git commit -m "feat: implement premium dashboard and dark mode"

# 4. Push to main branch
git push origin main
```

### Deployment (Vercel)
This project is optimized for **Vercel**:
1. Connect your GitHub repository to Vercel.
2. Add the environment variables from `.env.local` to the Vercel project settings.
3. Vercel will automatically deploy whenever you push to the `main` branch.

---

## 📜 License
MIT License. Built with ❤️ by the LogicBricks Team.
