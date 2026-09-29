# BuildConnect NCR - Production-Minded Construction Lead Platform

**BuildConnect NCR** is a high-converting, production-ready MERN stack web application built specifically for residential home construction businesses serving **Noida** and **Greater Noida, Uttar Pradesh, India**.

---

## 🌟 Key Features

### 🏢 Public Business Website & Local Lead Engine
- **Hero & Landing Pages:** High-impact hero section with "Build Your Dream Home with Confidence", supporting text for Noida & Greater Noida, and high-conversion CTAs.
- **Contract Services:**
  1. **Material + Labour Turnkey Contracts:** Complete civil structure + interior/exterior finishing.
  2. **Labour-Only Civil Work Contracts:** Skilled masonry, RCC shuttering, column & slab casting.
- **Interactive Construction Cost Calculator:**
  - Visitor inputs plot area per floor, number of floors, and contract type.
  - Dynamically calculates indicative total costs using admin-configured rates (e.g. ₹1,800/sqft for material+labour, ₹500/sqft for labour-only).
  - Clear disclaimer and CTA to request a detailed formal quotation with pre-filled inputs.
- **Local Area Landing Pages:** Dedicated landing pages for `/locations/noida` (Sectors 62, 137, 150, 128) and `/locations/greater-noida` (Noida Extension, Alpha, Beta, Yamuna Expressway).
- **Mobile Sticky Action Bar:** Bottom bar with direct **"Call Business"** (`tel:`) and instant prefilled **WhatsApp** chat (`https://wa.me/`).
- **Portfolio & Verified Testimonials:** Project showcase with filterable gallery and modal detail views.

### 🔐 Protected Admin & Staff Panel
- **Secure Authentication:** JWT authentication stored in secure HttpOnly cookies with bcrypt password hashing.
- **Role-Based Authorization:** `admin` and `staff` access levels.
- **No Public Admin Registration:** Admin user accounts can only be created via CLI script or by existing admins inside the dashboard.
- **Analytics Dashboard:**
  - Metrics cards: Total enquiries, new leads, site visits, quotes sent, won contracts, conversion rate %, total quoted value.
  - Interactive Recharts graphs: Lead Enquiry Trends line chart, Lead Status Distribution pie chart, Acquisition Source bar chart.
- **Lead Management:**
  - Searchable, filterable, paginated lead table.
  - Lead drawer with contact info, project specs, follow-up scheduler, internal notes log, status update audit trail, and instant WhatsApp trigger.
  - Lead Statuses: `new`, `contacted`, `site-visit`, `quote-sent`, `won`, `lost`.
- **Quotation Generator & Printable PDF Export:**
  - Generate formal quotes linked to customer leads with versioning (`v1`, `v2`).
  - Itemized scope of work, material brand specs, exclusions, and payment milestone schedule.
  - Dedicated printable layout (`window.print()`).
- **Portfolio CRUD:** Add, edit, draft, and publish portfolio projects.
- **Live Business Settings:** Update phone numbers, WhatsApp, email, office address, and cost calculator rates live without redeploying code.

---

## 🛠 Tech Stack

- **Frontend:** React 18, Vite, JavaScript, Tailwind CSS, Lucide React, React Hook Form, Zod, Recharts.
- **Backend:** Node.js, Express.js, Mongoose, JWT, bcryptjs, Helmet, CORS, Cookie Parser, Express Rate Limit.
- **Database:** MongoDB + Mongoose (with offline memory fallback support).

---

## 🚀 Quick Start & Local Setup

### 1. Prerequisites
- Node.js (v18+)
- npm (v9+)
- MongoDB (Local instance running at `mongodb://127.0.0.1:27017` or MongoDB Atlas URI)

### 2. Environment Setup
Copy `.env.example` in `server/` to `.env`:
```bash
cp server/.env.example server/.env
```

### 3. Install Dependencies
```bash
# Install root, server, and client dependencies
npm run install:all
```

### 4. Create Initial Admin User
Run the secure CLI admin setup script:
```bash
npm run setup:admin
```
*Initial Admin Credentials (from `.env`):*
- **Email:** `admin@buildconnectncr.com`
- **Password:** `Admin@BuildConnect2026`

### 5. Seed Sample Data (Optional)
```bash
npm run seed
```

### 6. Run Development Servers
```bash
# Terminal 1: Backend Server (Port 5000)
npm run dev:server

# Terminal 2: Frontend App (Port 5173)
npm run dev:client
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Running Automated Tests

To run the automated backend test suite:
```bash
npm test
```
The test suite verifies health endpoints, public settings, lead submission validation, WhatsApp URL formatting, authentication, role authorization, and calculator math logic.

---

## 📄 License & Attribution
Designed & developed for **BuildConnect NCR** - Serving Noida and Greater Noida, Uttar Pradesh, India.
