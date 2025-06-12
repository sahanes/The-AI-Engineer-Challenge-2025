# 🎨 AI Engineer Frontend

This mini Next.js app lets you chat with the FastAPI backend.

## 🚀 Running Locally

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

Make sure the backend in `/api` is running on port **8000** and that `OPENAI_API_KEY` is set before starting the server so the `/api/chat` route works while you test locally.
