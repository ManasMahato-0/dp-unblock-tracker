# DP Unblock — 6-Week Tracker

Full-stack version of the DP practice tracker. Next.js 14 (App Router) + MongoDB.
Accounts, per-user progress that syncs across devices, and a notes field per problem.

## Stack

- Next.js 14 App Router, React 18, TypeScript
- MongoDB via Mongoose
- Auth: email + password (bcrypt), JWT in an httpOnly cookie
- Validation: zod

## Local setup

1. `npm install`
2. Copy env: `cp .env.example .env.local`, then fill in:
   - `MONGODB_URI` — a MongoDB Atlas connection string (free tier is fine). Include a db name, e.g. `.../dp-tracker`.
   - `JWT_SECRET` — `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`
3. `npm run dev` → http://localhost:3000

First visit redirects to `/signup`. After signup you land on `/tracker`.

## MongoDB Atlas (free)

1. Create a cluster at https://cloud.mongodb.com (M0 free tier).
2. Database Access → add a user (username + password).
3. Network Access → allow `0.0.0.0/0` (or Vercel's ranges).
4. Connect → Drivers → copy the `mongodb+srv://...` string, insert the password, append `/dp-tracker`.

## Deploy (Vercel)

1. Push this folder to its own GitHub repo.
2. Import into Vercel.
3. Project → Settings → Environment Variables: add `MONGODB_URI` and `JWT_SECRET`.
4. Deploy.

## Data model

- `User` — `{ email, passwordHash }`
- `Progress` — one doc per user: `{ userId, entries: Map<problemCode, { td, bu, note }> }`

## API

| Method | Route                | Body                       | Notes                    |
|--------|----------------------|----------------------------|--------------------------|
| POST   | `/api/auth/signup`   | `{ email, password }`      | sets cookie              |
| POST   | `/api/auth/login`    | `{ email, password }`      | sets cookie              |
| POST   | `/api/auth/logout`   | —                          | clears cookie            |
| GET    | `/api/auth/me`       | —                          | current user             |
| GET    | `/api/progress`      | —                          | `{ entries, updatedAt }` |
| PUT    | `/api/progress`      | `{ entries }`              | full replace, upsert     |

The client debounces saves (~600ms) and does a full-state PUT. Last write wins across devices.
