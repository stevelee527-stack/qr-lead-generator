import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
}

export function createLeadNotificationEmail(lead: {
  name?: string;
  email: string;
  phone?: string;
  address?: string;
  message?: string;
  campaignName: string;
  landingPageName?: string;
  metadata?: any;
}) {
  return {
    subject: `🔔 New Lead: ${lead.name || lead.email}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6, #1e40af); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #4b5563; margin-bottom: 5px; }
            .value { background: white; padding: 12px; border-radius: 6px; border: 1px solid #e5e7eb; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🎯 New Lead Received!</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Campaign</div>
                <div class="value">${lead.campaignName}</div>
              </div>
              
              ${lead.landingPageName ? `
              <div class="field">
                <div class="label">Landing Page</div>
                <div class="value">${lead.landingPageName}</div>
              </div>
              ` : ''}
              
              ${lead.name ? `
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${lead.name}</div>
              </div>
              ` : ''}
              
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${lead.email}">${lead.email}</a></div>
              </div>
              
              ${lead.phone ? `
              <div class="field">
                <div class="label">Phone</div>
                <div class="value"><a href="tel:${lead.phone}">${lead.phone}</a></div>
              </div>
              ` : ''}
              
              ${lead.address ? `
              <div class="field">
                <div class="label">Address</div>
                <div class="value">${lead.address}</div>
              </div>
              ` : ''}
              
              ${lead.metadata?.windowCount ? `
              <div class="field">
                <div class="label">Window Count</div>
                <div class="value">${lead.metadata.windowCount} windows</div>
              </div>
              ` : ''}
              
              ${lead.message ? `
              <div class="field">
                <div class="label">Message</div>
                <div class="value">${lead.message}</div>
              </div>
              ` : ''}
              
              <div class="field" style="margin-top: 30px; text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/leads" 
                   style="display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                  View in Dashboard
                </a>
              </div>
            </div>
            <div class="footer">
              <p>This lead was submitted on ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };
}
