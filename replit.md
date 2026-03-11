# New Wave Fest - Concert Ticket Booking App

## Overview
A full-stack concert ticket booking application. The Express backend serves both the REST API and the pre-built React frontend as static files.

## Architecture

- **Backend**: Node.js + Express (`server.js`) — serves on port 5000
- **Frontend**: React (pre-built in `client/build/`) — served as static files by Express
- **Database**: In-memory JS object (`db.js`) — no external database

## Project Structure

```
/
├── server.js           # Express server entry point
├── db.js               # In-memory data store (concerts, seats, testimonials)
├── routes/
│   ├── concert.routes.js
│   ├── seats.routes.js
│   └── testImonials.routes.js
├── client/
│   ├── src/            # React source code
│   ├── build/          # Pre-compiled React app (served as static files)
│   └── package.json
└── package.json
```

## API Endpoints

- `GET/POST /api/concerts` — concert listings
- `GET/PUT/DELETE /api/concerts/:id`
- `GET/POST /api/seats` — seat bookings
- `GET/PUT/DELETE /api/seats/:id`
- `GET/POST /api/testimonials` — customer testimonials
- `GET /api/testimonials/random`
- `GET/PUT/DELETE /api/testimonials/:id`

## Running

```bash
npm start   # Starts the Express server on port 5000
```

## Notes

- The React frontend is already compiled; run `cd client && npm run build` to rebuild after frontend changes.
- Data is in-memory and resets on server restart.
- Deployment target: autoscale (`node server.js`)
