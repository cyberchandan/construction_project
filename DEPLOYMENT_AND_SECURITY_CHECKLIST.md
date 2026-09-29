# BuildConnect NCR - Deployment & Security Checklist

---

## 🔒 Security Checklist

1. **Environment Variables:**
   - Ensure `JWT_SECRET` is changed to a 64+ character random string in production.
   - Never commit `.env` files to git repositories. `.env.example` contains placeholders only.

2. **Authentication & Cookies:**
   - JWT tokens are stored in `HttpOnly` cookies.
   - In production (`NODE_ENV=production`), cookie flags `Secure: true` and `SameSite: strict` are automatically enabled by server utility.

3. **Rate Limiting & Spam Protection:**
   - Public lead submission route `/api/v1/leads` is rate limited to 10 submissions per 15 minutes per IP.
   - Login route `/api/v1/auth/login` is rate limited to 5 attempts per 15 minutes.
   - Duplicate submissions within 10 minutes with the same mobile number are prevented.

4. **NoSQL & Script Injection Safeguards:**
   - All MongoDB inputs are sanitized via schema validation and string trimming.
   - Helmet headers activated.

5. **Customer Privacy Protection:**
   - Customer phone numbers, emails, and address details are NEVER exposed in public API endpoints (`/api/v1/projects`, `/api/v1/settings/public`).
   - Only authenticated staff and admin roles can query `/api/v1/leads`.

---

## 🚀 Free-Tier Deployment Options

### Backend Deployment (Node.js REST API)
- **Render / Railway / Render Web Service:**
  - Build Command: `npm install`
  - Start Command: `npm start` (Runs `node server.js`)
  - Set Environment Variables: `MONGODB_URI`, `JWT_SECRET`, `CLIENT_ORIGIN`, `NODE_ENV=production`.

### Database Deployment (MongoDB Atlas Free Tier)
- Create a free M0 Cluster on MongoDB Atlas.
- Add IP Whitelist `0.0.0.0/0` or deployment server IP.
- Set `MONGODB_URI` in production server environment.

### Frontend Deployment (Static Vite App)
- **Vercel / Netlify / Render Static Site:**
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Configure rewrite rule: `/*` -> `/index.html` (for React Router single page app routing).
