# BuildConnect NCR - Business Details Configuration Checklist

Before launching the website live for your father's business, please update the following business settings either in `server/.env` or directly through the **Admin Dashboard -> Business Settings** panel:

---

## 📋 Business Details Checklist

- [ ] **Official Business Name:** Verify exact registered name (e.g., `BuildConnect NCR` or father's official business name).
- [ ] **Primary Calling Number:** Update `BUSINESS_PHONE` (e.g. `+91 98100 12345`). Used for direct `tel:` calls.
- [ ] **WhatsApp Business Number:** Update `BUSINESS_WHATSAPP`. Must include country code without plus sign (e.g., `919810012345`).
- [ ] **Business Email:** Update `BUSINESS_EMAIL` for receiving contact notifications.
- [ ] **Physical Office Address:** Enter actual office address in Noida or Greater Noida.
- [ ] **GSTIN / Business Registration Number (Optional):** Can be displayed in quote footer.
- [ ] **Cost Calculator Base Rates:**
  - `Material + Labour Rate:` Default set to `₹1,800 / sq ft` (Adjust based on current Noida material prices for cement, steel, etc.).
  - `Labour-Only Rate:` Default set to `₹500 / sq ft` (Adjust based on local mason & RCC rates).
- [ ] **Initial Admin Credentials:** Update `INITIAL_ADMIN_EMAIL` and `INITIAL_ADMIN_PASSWORD` in `.env` before running `npm run setup:admin`.
- [ ] **Optional SMTP Email Service:** Configure `EMAIL_HOST`, `EMAIL_USER`, `EMAIL_PASS` in `.env` if automatic email alerts on new lead submission are desired.
- [ ] **Optional Cloudinary Credentials:** Configure Cloudinary keys if image upload to Cloudinary CDN is desired (otherwise default URL storage works).

---

## 📍 Service Locations Configured
- Noida Sectors (62, 137, 150, 128, 108, Noida Expressway)
- Greater Noida West (Noida Extension)
- Greater Noida (Alpha, Beta, Gamma, Delta, Omega, Zeta)
- Yamuna Expressway Plots
