const nodemailer = require('nodemailer');

const sendLeadNotificationEmail = async (lead) => {
  const host = process.env.EMAIL_HOST;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const recipient = process.env.NOTIFICATION_EMAIL || process.env.BUSINESS_EMAIL || 'owner@buildconnectncr.com';

  if (!host || !user || !pass) {
    console.log(`[Email Service Notice] Email credentials not fully configured. Notification logged locally:`);
    console.log(`NEW LEAD RECEIVED: ${lead.name} (${lead.phone}) for ${lead.serviceType} in ${lead.location}, Area: ${lead.areaSqFt} sq ft`);
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: host,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: { user, pass },
    });

    const mailOptions = {
      from: `"BuildConnect NCR Leads" <${user}>`,
      to: recipient,
      subject: `🚨 New Construction Lead: ${lead.name} - ${lead.location}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #172C25; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #172C25; color: #ffffff; padding: 16px 24px;">
            <h2 style="margin: 0;">New Construction Enquiry Received</h2>
            <p style="margin: 4px 0 0; color: #B8D9B4;">BuildConnect NCR Lead Alert</p>
          </div>
          <div style="padding: 24px; color: #333333;">
            <p><strong>Customer Name:</strong> ${lead.name}</p>
            <p><strong>Mobile Number:</strong> <a href="tel:${lead.phone}">${lead.phone}</a></p>
            <p><strong>Email:</strong> ${lead.email || 'N/A'}</p>
            <p><strong>Location:</strong> ${lead.location}</p>
            <p><strong>Service Type:</strong> ${lead.serviceType === 'material_labour' ? 'Complete (Material + Labour)' : 'Labour-Only'}</p>
            <p><strong>Plot / Built Area:</strong> ${lead.areaSqFt} sq ft (${lead.floors} floor/s)</p>
            <p><strong>Estimated Budget:</strong> ${lead.budget}</p>
            <p><strong>Start Timeline:</strong> ${lead.startDate}</p>
            <p><strong>Requirements/Message:</strong> ${lead.message || 'None provided'}</p>
            <p><strong>Lead Source:</strong> ${lead.source} (${lead.landingPage})</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`[Email Service] Lead notification email dispatched to ${recipient}`);
    return true;
  } catch (error) {
    console.error(`[Email Service Error] Failed to send email: ${error.message}`);
    return false;
  }
};

module.exports = { sendLeadNotificationEmail };
