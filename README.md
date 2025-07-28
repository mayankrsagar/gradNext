# GradNext Full-Stack Application

This repository contains:
- **Backend:** Express + MongoDB automation workflow for cohort enrollment and email reminders.
- **Frontend:** Next.js (App Router) + Tailwind CSS landing page.

## Setup Instructions

### 1. Clone and Install
```bash
git clone git remote add origin https://github.com/mayankrsagar/gradNext.git
cd gradNext
```

#### Backend
```bash
cd backend
npm install
```
- Create `.env` (see sample above).
- Run: `npm start`
- Endpoints:
  - `POST /api/cohort/submit`
  - `GET /api/cohort/open/:id`
  - `GET /api/cohort/click/:id`

#### Frontend
```bash
cd frontend
npm install
npm run dev
```
- Visit `http://localhost:3000`
- Form submits to `http://localhost:5000/api/cohort/submit`

## .gitignore
```
# Node
node_modules/
.env
npm-debug.log
.DS_Store
```

## Contributing
Feel free to open issues or pull requests!
