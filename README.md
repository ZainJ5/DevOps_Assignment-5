# News Aggregator — CI/CD Pipeline (DevOps Assignment 5)

A full-stack **News Aggregator** web application, containerized with Docker and shipped
through a complete **GitHub Actions CI/CD pipeline** that builds, tests, and deploys to
**AWS (ECR + EC2)** across dedicated **testing** and **staging** environments.

> Course: **CS316 – DevOps** · Maintainers: **Zain Jamshaid** ([@ZainJ5](https://github.com/ZainJ5)) · Contributor

---

## ✨ Features

- 📰 Aggregates news articles (via the **Guardian API**) with categories, search, and bookmarks
- 🤖 In-app **AI chatbot** powered by **Google Gemini**
- 🔐 Authentication with **JWT** + **Firebase** (Google sign-in), protected & admin routes
- 🗂️ User preferences, notes, comments, reactions, reports, and newsletter subscriptions
- 📧 Email notifications via **Nodemailer**
- 🛠️ Admin panel for content & user management

## 🧱 Tech stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 19, Vite, Tailwind CSS, React Router, Framer Motion, Firebase |
| **Backend** | Node.js, Express 5, Sequelize ORM, JWT, bcrypt, Nodemailer |
| **Database** | PostgreSQL 15 |
| **AI** | Google Gemini (`@google/generative-ai`) |
| **Testing** | Vitest (frontend), Jest (backend), ESLint |
| **DevOps** | Docker, Docker Compose, GitHub Actions, AWS ECR, AWS EC2 |

## 🔁 CI/CD pipelines

Two workflows under [`.github/workflows/`](.github/workflows/):

| Pipeline | Trigger | What it does |
|----------|---------|--------------|
| **Testing** (`testing-pipeline.yml`) | Pull request → `main` | Install, **lint & test** frontend + backend → build & push Docker images to **ECR** → deploy to the **testing** EC2 host → email status notification |
| **Staging** (`staging-pipeline.yml`) | Push → `main` | Same build/test/lint → deploy to the **staging** EC2 host → email status notification |

Both pipelines authenticate to AWS, push `frontend` and `backend` images to Amazon ECR, then
SSH into the target EC2 instance and run `docker compose pull && docker compose up -d`.

## 🚀 Run locally

```bash
# 1. Backend
cd backend
npm install
cp .env.example .env      # fill in your own values (see Configuration)
npm test                  # run jest tests
node src/index.js

# 2. Frontend (in a second terminal)
cd frontend
npm install
npm run dev               # Vite dev server
```

Or run the whole stack with Docker Compose:

```bash
docker compose up -d --build
# frontend → http://localhost:4173 · backend → http://localhost:3000
```

## ⚙️ Configuration

The backend reads configuration from a `.env` file. Create your own from the example and
**never commit real secrets**:

```env
DB_NAME=...
DB_USER=...
DB_PASSWORD=...
DB_HOST=...
PORT=3000
JWT_SECRET=...
GUARDIAN_API_KEY=...
GEMINI_API_KEY=...
EMAIL_USER=...
EMAIL_APP_PASSWORD=...
```

Pipeline secrets (set in **GitHub → Settings → Secrets and variables → Actions**):
`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `EC2_TESTING_HOST`,
`EC2_STAGING_HOST`, `EC2_SSH_KEY`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`,
`EMAIL_USERNAME`, `EMAIL_PASSWORD`.

## 📁 Repository layout

```
.
├── .github/workflows/      # CI/CD pipelines (testing & staging)
├── backend/                # Express + Sequelize API (Dockerized)
│   └── src/{controllers,models,routes,middleware,utils}
├── frontend/               # React + Vite app (Dockerized)
│   └── src/{components,pages,context,services}
├── docker-compose.yml      # db + backend + frontend
└── README.md
```
