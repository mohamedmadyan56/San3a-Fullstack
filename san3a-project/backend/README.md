# San3a Backend 🛠️

**San3a** (صنعة) is a Node.js REST API for a home-services marketplace that connects customers with nearby craftsmen for plumbing, electrical, AC repair, cleaning, and similar services.

Built with **Express 5**, **MongoDB**, and **Mongoose 9**.

---

## Features

- **User authentication** — JWT-based signup and login with role support (`customer`, `craftsman`, `admin`)
- **Password reset** — Email-based forgot/reset password flow (partial implementation)
- **Service catalog** — CRUD-ready service listing for the landing page
- **Service requests** — Customers create orders with location, notes, and scheduling
- **Dynamic pricing** — Base fee + emergency fee for immediate requests
- **Geospatial matching** — Find available craftsmen within 10 km using MongoDB `$near`
- **Request lifecycle** — Status tracking from `PENDING_MATCHING` through `COMPLETED`
- **Role-based access** — `protect` and `restrictTo` middleware for route authorization

---

## Tech Stack

| Technology | Version |
|------------|---------|
| Node.js | >= 16 |
| Express | ^5.2.1 |
| MongoDB / Mongoose | ^9.6.3 |
| jsonwebtoken | ^9.0.3 |
| bcryptjs | ^3.0.3 |
| cors | ^2.8.6 |
| dotenv | ^17.4.2 |
| validator | ^13.15.35 |

---

## Installation

```bash
# Clone the repository and navigate to backend
cd backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your MongoDB URI, JWT secret, and email credentials
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGO_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret key for signing JWTs |
| `PORT` | No | Server port (default: `5000`) |
| `NODE_ENV` | No | `development` or `production` |
| `FRONTEND_URL` | No | CORS origin (default: `http://localhost:3000`) |
| `EMAIL_HOST` | For password reset | SMTP host |
| `EMAIL_PORT` | For password reset | SMTP port |
| `EMAIL_USERNAME` | For password reset | SMTP username |
| `EMAIL_PASSWORD` | For password reset | SMTP password |

See `.env.example` for a full template.

---

## Running Locally

### Development (with auto-reload)

```bash
npm run dev
```

### Production

```bash
npm start
# or
npm run start:prod
```

Expected console output:

```
✅ Database connected successfully!
🚀 Server is running and listening on port 5000...
```

---

## API Overview

**Base URL:** `http://localhost:5000/api/v1`

### Authentication — `/users`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/users/signup` | No | Register new user |
| POST | `/users/login` | No | Login and receive JWT |
| POST | `/users/forgotPassword` | No | Send password reset email |
| POST | `/users/resetPassword/:token` | No | Reset password with token |
| GET | `/users/profile` | Yes | Get authenticated user profile |
| GET | `/users/admin-dashboard` | Admin | Admin test route |
| GET | `/users/craftsman-orders` | Craftsman/Admin | Craftsman test route |

### Services — `/services`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/services/` | No | List active services |
| POST | `/services/` | No | Create a service |

### Requests — `/requests`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/requests/` | Yes | Create a service request |
| GET | `/requests/:id` | Yes | Get request by ID |
| GET | `/requests/:requestId/nearby-craftsmen` | Yes | Find nearby available craftsmen |
| PATCH | `/requests/:requestId/status` | Yes | Update request status |
| PATCH | `/requests/:requestId/complete` | Yes | Mark request as completed |

> **Note:** `acceptRequest` exists in the controller but is not yet exposed as a route.

### Authentication Header

```
Authorization: Bearer <your_jwt_token>
```

---

## Folder Structure

```
backend/
├── server.js                          # Entry point, DB connection
├── app.js                             # Express app setup
├── package.json
├── .env.example
├── SAN3A_BACKEND_DOCUMENTATION.md     # Full technical documentation
└── src/
    ├── controllers/
    │   ├── authController.js          # Auth, JWT, password reset
    │   ├── requestController.js       # Requests & geospatial matching
    │   └── serviceController.js       # Service catalog
    ├── models/
    │   ├── userModel.js               # User schema & password hooks
    │   ├── requestModel.js            # Request/order schema
    │   └── serviceModel.js            # Service catalog schema
    ├── routes/
    │   ├── userRoutes.js
    │   ├── requestRoutes.js
    │   └── serviceRoutes.js
    └── utils/
        └── email.js                   # Nodemailer email sender
```

---

## Database Collections

| Collection | Model | Purpose |
|------------|-------|---------|
| `users` | User | Customers, craftsmen, admins |
| `services` | Service | Service type catalog |
| `requests` | Request | Customer service orders |

---

## Seed Data

No automated seed script is included. Create services manually:

```bash
curl -X POST http://localhost:5000/api/v1/services/ \
  -H "Content-Type: application/json" \
  -d '{
    "nameAr": "سباكة",
    "nameEn": "Plumbing",
    "slug": "plumbing",
    "icon": "wrench"
  }'
```

---

## Documentation

For complete technical documentation covering architecture, database schemas, authentication flows, security analysis, and API internals, see:

**[SAN3A_BACKEND_DOCUMENTATION.md](./SAN3A_BACKEND_DOCUMENTATION.md)**

---

## Known Limitations

- Password reset handler (`resetPassword`) is incomplete — no success response returned
- Craftsman accept-request endpoint not wired to routes
- `nodemailer` is used in code but not listed in `package.json` — install manually: `npm install nodemailer`
- No automated tests
- No reviews, notifications, payment processing, or real-time updates
- Logout endpoint not implemented (client-side token removal only)

---

## Future Improvements

- [ ] Wire `PATCH /requests/:requestId/accept` route
- [ ] Complete password reset flow with JWT response and `passwordChangedAt`
- [ ] Add `nodemailer` to dependencies
- [ ] Extract middleware to dedicated folder
- [ ] Global error handler and `AppError` class
- [ ] Input validation with Joi
- [ ] Protect service creation with admin role
- [ ] Reviews and ratings system
- [ ] Payment gateway integration
- [ ] Real-time request updates (WebSocket/Socket.IO)
- [ ] Automated tests (Jest/Supertest)
- [ ] Rate limiting and Helmet security headers
- [ ] Seed script for services and test users

---

## Author

**Mohamed Madyan**  
Graduation Project — San3a Home Services Platform

---

## License

ISC
