# BuildConnect NCR - REST API Documentation

Base URL: `/api/v1`

---

## 🟢 Public Endpoints

### 1. Health Check
- **Endpoint:** `GET /api/v1/health`
- **Access:** Public
- **Description:** Verifies server uptime and API version.
- **Response Example (200 OK):**
```json
{
  "status": "UP",
  "timestamp": "2026-09-29T13:40:00.000Z",
  "service": "BuildConnect NCR Construction Lead Engine",
  "version": "1.0.0"
}
```

### 2. Get Public Business & Cost Calculator Settings
- **Endpoint:** `GET /api/v1/settings/public`
- **Access:** Public
- **Description:** Fetches public business contact details and calculator base rates.

### 3. Submit Quotation Lead Enquiry
- **Endpoint:** `POST /api/v1/leads`
- **Access:** Public (Rate Limited)
- **Request Body:**
```json
{
  "name": "Rohan Sharma",
  "phone": "9810098100",
  "email": "rohan@example.com",
  "location": "Sector 150 Noida",
  "serviceType": "material_labour",
  "projectType": "new_construction",
  "areaSqFt": 2500,
  "floors": 2,
  "budget": "₹40 - ₹50 Lakhs",
  "startDate": "Within 1 Month",
  "message": "Interested in turnkey villa contract.",
  "consent": true
}
```
- **Response Example (201 Created):**
```json
{
  "success": true,
  "message": "Thank you! Your construction enquiry has been received successfully...",
  "leadId": "66f91234abcd...",
  "whatsappUrl": "https://wa.me/919810012345?text=..."
}
```

### 4. Get Published Projects Gallery
- **Endpoint:** `GET /api/v1/projects`
- **Access:** Public
- **Query Params:** `serviceType` (optional), `location` (optional)

### 5. Get Project Detail by Slug
- **Endpoint:** `GET /api/v1/projects/:slug`
- **Access:** Public

---

## 🔒 Protected Admin & Staff Endpoints

### 6. Staff / Admin Login
- **Endpoint:** `POST /api/v1/auth/login`
- **Access:** Public (Rate Limited)
- **Request Body:**
```json
{
  "email": "admin@buildconnectncr.com",
  "password": "Admin@BuildConnect2026"
}
```
- **Response:** Sets HttpOnly JWT cookie `token`.

### 7. Get Authenticated User
- **Endpoint:** `GET /api/v1/auth/me`
- **Access:** Private (Admin / Staff)

### 8. Staff Logout
- **Endpoint:** `POST /api/v1/auth/logout`
- **Access:** Private

### 9. Get Leads Listing
- **Endpoint:** `GET /api/v1/leads`
- **Access:** Private (Admin / Staff)
- **Query Params:** `page`, `limit`, `status`, `serviceType`, `search`

### 10. Update Lead Status & Add Notes
- **Endpoint:** `PATCH /api/v1/leads/:id`
- **Access:** Private (Admin / Staff)
- **Request Body:**
```json
{
  "status": "site-visit",
  "nextFollowUp": "2026-10-05",
  "noteText": "Site visit scheduled for 10 AM on Saturday."
}
```

### 11. Generate Formal Quotation
- **Endpoint:** `POST /api/v1/quotes`
- **Access:** Private (Admin / Staff)

### 12. Dashboard Analytics & Charts
- **Endpoint:** `GET /api/v1/dashboard/stats`
- **Access:** Private (Admin / Staff)

### 13. Update Business Settings & Rates
- **Endpoint:** `PATCH /api/v1/settings`
- **Access:** Private (Admin Only)

### 14. Create Staff Account
- **Endpoint:** `POST /api/v1/admin/staff`
- **Access:** Private (Admin Only)
