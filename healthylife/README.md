# HealthyLife AI — Full Stack Health Assistant

A complete full-stack web application that helps users maintain a healthy lifestyle through AI-powered weekly training plans, daily health tracking, an AI chat assistant, and a personal diary.

---

## Project Structure

```
healthylife/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── aiController.js        # AI plan generation + chat
│   │   ├── userController.js      # Auth (register/login)
│   │   ├── healthController.js    # Daily health data
│   │   └── diaryController.js     # Journal entries
│   ├── middleware/
│   │   └── auth.js                # JWT protect middleware
│   ├── models/
│   │   ├── User.js                # User schema (bcrypt password)
│   │   ├── HealthData.js          # Daily tracking schema
│   │   ├── Diary.js               # Journal entry schema
│   │   └── TrainingPlan.js        # AI-generated plan schema
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── healthRoutes.js
│   │   ├── diaryRoutes.js
│   │   └── aiRoutes.js
│   ├── server.js                  # Express entry point
│   ├── package.json
│   └── .env.example               # Copy to .env and fill values
│
└── frontend/
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── api.js                 # Central fetch helper
    │   ├── app.js                 # Bootstrap + navigation
    │   ├── auth.js                # Login / register / logout
    │   ├── dashboard.js           # Dashboard page
    │   ├── plan.js                # Weekly AI plan page
    │   ├── tracker.js             # Daily tracker page
    │   ├── chat.js                # AI chat page
    │   └── diary.js               # Diary page
    └── index.html
```

---

## Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB (local install OR free MongoDB Atlas account)
- Anthropic API key — get one at https://console.anthropic.com

### 1. Install backend dependencies

```bash
cd backend
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and set:
```
MONGO_URI=mongodb://localhost:27017/healthylife
JWT_SECRET=any_long_random_secret_string
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx
PORT=5000
```

### 3. Start the server

```bash
# Development (auto-restart on changes)
npm run dev

# Production
npm start
```

### 4. Open in browser

Visit **http://localhost:5000**

The Express server serves the frontend automatically — no separate frontend server needed.

---

## API Endpoints

### Auth
| Method | Endpoint              | Auth | Description          |
|--------|-----------------------|------|----------------------|
| POST   | /api/users/register   | No   | Create account       |
| POST   | /api/users/login      | No   | Login, get JWT       |
| GET    | /api/users/profile    | Yes  | Get user profile     |
| PUT    | /api/users/profile    | Yes  | Update profile       |

### Health Tracking
| Method | Endpoint              | Auth | Description          |
|--------|-----------------------|------|----------------------|
| POST   | /api/health/log       | Yes  | Log today's data     |
| GET    | /api/health/today     | Yes  | Get today's record   |
| GET    | /api/health/history   | Yes  | Last 30 days         |

### Diary
| Method | Endpoint              | Auth | Description          |
|--------|-----------------------|------|----------------------|
| POST   | /api/diary            | Yes  | Create entry         |
| GET    | /api/diary            | Yes  | Get all entries      |
| DELETE | /api/diary/:id        | Yes  | Delete entry         |

### AI
| Method | Endpoint              | Auth | Description                |
|--------|-----------------------|------|----------------------------|
| POST   | /api/ai/plan          | Yes  | Generate 7-day AI plan     |
| GET    | /api/ai/plan/latest   | Yes  | Fetch latest saved plan    |
| POST   | /api/ai/chat          | Yes  | Multi-turn AI health chat  |

---

## Features

- **AI Weekly Training Plan** — Enter age, weight, height, goal, activity level and health conditions. Claude AI generates a personalised 7-day plan with exercises, sets/reps, BMI analysis, calorie targets, and rest days (always at least 1).
- **Daily Tracker** — Log steps, water intake, calories burned, and sleep with progress bars against daily goals.
- **AI Chat** — Multi-turn conversational health assistant powered by Claude, with chat history context.
- **Diary** — Daily journal with mood selector, timestamped entries, and delete functionality.
- **Dashboard** — Summary view of today's health data and current plan overview.
- **Authentication** — JWT-based auth with bcrypt password hashing.
- **Responsive** — Works on desktop and mobile browsers.

---

## Future Enhancements

- Push notifications and reminders
- Progress charts (Chart.js / D3)
- Export data as PDF
- Mobile app (React Native)
- Streak tracking and gamification
- Social / accountability features
