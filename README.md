# SkillShare Hub API

A platform to connect mentors and learners.

# 📘 SkillShare Hub API

SkillShare Hub is a RESTful API that connects **mentors** offering skills with **learners** who want to book learning sessions. Built with Express.js and MongoDB, the API supports authentication, role-based authorization, and CRUD operations for both skills and bookings.

---

## 🚀 Features

- 🔒 JWT Authentication (login/register)
- 🔐 Role-based Access Control (Mentor / Learner)
- 🧠 Mentors can create, update, and delete their offered skills
- 📅 Learners can browse skills and create bookings
- 🔎 Text Search on Skills
- 📊 Aggregations (e.g., average rating per mentor)
- ✅ REST API with >80% test coverage (if tests are implemented)

---

## 🛠️ Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication
- bcrypt for password hashing
- Jest + Supertest for testing

---

## 📦 Installation

```bash
git clone https://github.com/your-username/skillshare-hub.git
cd skillshare-hub
npm install

npm run dev  # for development with nodemon
npm start    # for production

npm test # run test


| Method | Endpoint             | Description                   |
| ------ | -------------------- | ----------------------------- |
| POST   | `/api/auth/register` | Register as mentor or learner |
| POST   | `/api/auth/login`    | Login and get JWT             |
| GET    | `/api/auth/me`       | Get logged-in user info       |

| Method | Endpoint          | Description              |
| ------ | ----------------- | ------------------------ |
| GET    | `/api/skills`     | Get all skills           |
| POST   | `/api/skills`     | Create a new skill       |
| PUT    | `/api/skills/:id` | Update an existing skill |
| DELETE | `/api/skills/:id` | Delete a skill           |

| Method | Endpoint            | Description            |
| ------ | ------------------- | ---------------------- |
| GET    | `/api/bookings`     | Get learner’s bookings |
| POST   | `/api/bookings`     | Book a skill session   |
| PUT    | `/api/bookings/:id` | Update a booking       |
| DELETE | `/api/bookings/:id` | Cancel a booking       |
