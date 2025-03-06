# NeoCampus

A Platform For Digitalization Campus System // need to edit

By Team The Mavericks - [@Siratul804](https://github.com/Siratul804), [@AsTeriaa09](https://github.com/AsTeriaa09), [@atik64](https://github.com/atik65), [mdyhakash](https://github.com/mdyhakash)
<div align="center">

<br />

  <img src="/public/neoCam.png" alt="ide" width="500"/>

### 🎯 A Platform For Digitalization Campus System // need to edit

[Report Bug](https://github.com/Siratul804/NeoHire/issues) · [Request Feature](https://github.com/Siratul804/NeoHire/issues) · [Pull Request](https://github.com/Siratul804/NeoFetchHackathon/pulls) 

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?style=for-the-badge&logo=openai)](https://openai.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)

</div>

## 🌟 Overview

**NeoCampus** A Platform For Digitalization Campus System // need to edit

## 🚀 Features

### 📍 Dashboard (`/dashboard`)

![alt text](/public/Dashboard.png)


- Dashboard




## 🚀 Installation Guide

### Prerequisites

- Node.js 18+ and npm 9+
- MongoDB database
- Socket.io
- Required API keys:
  - Clerk (Authentication)
  - GROQ (AI)

### 🖥️ Local Development

1. **Clone and Install**

```bash
git clone https://github.com/Siratul804/NeoFetchHackathon.git
cd NeoCampus
npm install
```

2. **Setup Environment**

``` env
# database
MONGO_PASS=oIVOympTPF0RoMLp
MONGO=mongodb+srv://23201128:oIVOympTPF0RoMLp@neofetch.nq8ec.mongodb.net/?retryWrites=true&w=majority&appName=NeoFetch

# auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_Y2xlYXItbGFyay01NC5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_JomSl6FHkCn6HNZ2m5rygO6Y7NnRERHxUWFCxYtskS
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# ai models
GROQ_API_KEY=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

Start project : node server.mjs
```

3. **Start Development Server**

```bash
node server.mjs
# Open http://localhost:3000
```

### Troubleshooting

- **Environment**: Double-check API keys and MongoDB connection
- **Port Conflict**: Use `npm run dev -- -p 3001` for alternate port

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15.1.7, React 19
- **Styling**: TailwindCSS, Shadcn/ui, Framer Motion
- **Components**: Radix UI
- **State**: React Context

### Backend & Infrastructure

- **Runtime**: Node.js, Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Realtime**: Socket.io
- **Auth**: Clerk
- **Deployment**: Docker, Vercel
- **Analytics**: Vercel Analytics & Speed Insights

### AI/ML

- **Language Models**: GROQ llama-3.3-70b-versatile

## 📝 License

MIT License - see [LICENSE](LICENSE)

---

Created by Team The Mavericks


