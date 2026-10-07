# StudyNook (Client)

StudyNook is a study room booking app where users can browse rooms, book hourly slots, and manage their own listings.

**Live site:** https://study-nook-yxp1.vercel.app

## Tech Stack
- React + Vite
- Tailwind CSS
- React Router
- Axios
- Google OAuth (@react-oauth/google)

## Features
- Email/password and Google login
- Browse and filter study rooms
- Book rooms by the hour
- Add, edit, and delete your own room listings
- View and cancel your bookings

## Run Locally
1. Install dependencies:
   ```
   npm install
   ```
2. Start the dev server:
   ```
   npm run dev
   ```

The dev server proxies `/api` requests to the backend at `http://localhost:5000`.

## Deployment
Deployed on Vercel. `vercel.json` rewrites `/api/*` to the backend so login cookies work on mobile browsers.