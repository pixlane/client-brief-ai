# Client Brief AI

Generate a clear website or product brief in minutes. Describe your business, goals, and needs—get an AI-generated brief you can use to plan your next website or digital product.

## Setup

1. **Clone and install**

   ```bash
   cd client-brief-ai
   npm install
   ```

2. **Configure environment**

   Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

   Add your OpenAI API key to `.env.local`:

   ```
   OPENAI_API_KEY=sk-your-key-here
   ```

3. **Run locally**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

4. **Build for production**

   ```bash
   npm run build
   npm start
   ```

## Deploy to Vercel

1. Push the `client-brief-ai` folder to a Git repository (or use the root if this is the only app).

2. In [Vercel](https://vercel.com), import the project.

3. Set the **Root Directory** to `client-brief-ai` if the app lives in that subfolder.

4. Add the environment variable:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** Your OpenAI API key

5. Deploy. Vercel will run `npm install` and `npm run build` automatically.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- OpenAI API

## Environment Variables

| Variable         | Required | Description                    |
|------------------|----------|--------------------------------|
| `OPENAI_API_KEY` | Yes      | OpenAI API key for generation  |
