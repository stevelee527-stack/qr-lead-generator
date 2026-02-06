# QR Lead Generator

A full-stack web application for creating dynamic QR codes, building custom landing pages, and capturing leads with real-time email notifications.

## 🚀 Features

- **Dynamic QR Code Generation**: Create trackable QR codes with custom styling
- **Landing Page Builder**: Build beautiful, conversion-optimized landing pages
- **Lead Capture System**: Collect and manage leads from your campaigns
- **Real-time Notifications**: Get instant email alerts when new leads submit
- **Campaign Management**: Organize QR codes and landing pages by campaign
- **Analytics**: Track QR code scans and lead conversions

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **QR Codes**: qrcode, qr-code-styling
- **Email**: Nodemailer
- **Validation**: Zod

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- SMTP email service (SendGrid, Gmail, etc.)

## 🔧 Installation

### 1. Clone and Install Dependencies

```bash
cd qr-lead-generator
npm install
```

### 2. Set Up Database

Create a PostgreSQL database and copy the connection string.

### 3. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/qr_lead_generator"

# Email Configuration (example with SendGrid)
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT=587
SMTP_USER="apikey"
SMTP_PASSWORD="your-sendgrid-api-key"
EMAIL_FROM="noreply@yourdomain.com"

# Design Consultant Email (where lead notifications go)
CONSULTANT_EMAIL="consultant@yourdomain.com"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Initialize Database

```bash
npx prisma generate
npx prisma db push
```

### 5. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## 📖 Usage Guide

### Creating a Campaign

1. Go to Dashboard
2. Click "Create New Campaign"
3. Enter campaign name and description
4. Save campaign

### Generating QR Codes

1. Select a campaign
2. Click "Generate QR Code"
3. Choose a landing page or use default
4. Download and share your QR code

### Building Landing Pages

1. Navigate to Landing Page Builder
2. Choose a template (default or minimal)
3. Customize:
   - Hero section (title, subtitle)
   - Form fields and labels
   - Theme colors
   - Features section
4. Preview in real-time
5. Publish when ready

### Managing Leads

1. Go to Admin Panel
2. View all leads by campaign
3. Mark leads as contacted
4. Export lead data

## 🏗️ Project Structure

```
qr-lead-generator/
├── app/
│   ├── api/
│   │   ├── campaigns/        # Campaign CRUD operations
│   │   ├── qr/              # QR code generation & tracking
│   │   ├── landing-pages/   # Landing page management
│   │   └── leads/           # Lead capture & retrieval
│   ├── dashboard/           # Admin dashboard
│   ├── landing/[slug]/      # Public landing pages
│   └── admin/               # Admin panel
├── components/
│   ├── qr/                  # QR code components
│   ├── landing-builder/     # Landing page editor
│   └── ui/                  # Reusable UI components
├── lib/
│   ├── prisma.ts           # Database client
│   ├── qr-generator.ts     # QR code utilities
│   ├── email.ts            # Email notifications
│   └── landing-page-templates.ts
├── prisma/
│   └── schema.prisma       # Database schema
└── public/                 # Static assets
```

## 🗄️ Database Schema

- **User**: User accounts
- **Campaign**: Marketing campaigns
- **QRCode**: Generated QR codes with tracking
- **LandingPage**: Custom landing pages
- **Lead**: Captured lead information

## 📧 Email Notifications

When a lead submits a form:
1. Lead data is saved to database
2. Email notification is sent to CONSULTANT_EMAIL
3. Email includes all lead details and link to dashboard

### Email Providers

**SendGrid** (Recommended):
```env
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT=587
SMTP_USER="apikey"
SMTP_PASSWORD="your-api-key"
```

**Gmail**:
```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
```

## 🎨 Customization

### Landing Page Templates

Edit `lib/landing-page-templates.ts` to:
- Add new section types
- Create custom templates
- Modify default styling

### Theme Colors

Customize in Tailwind config or per landing page:
- Primary color
- Secondary color
- Font families

## 🔒 Security Best Practices

- Never commit `.env` file
- Use environment variables for secrets
- Validate all user inputs with Zod
- Sanitize email content
- Use HTTPS in production
- Implement authentication (coming soon)

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Database Setup

Use a managed PostgreSQL service:
- **Vercel Postgres**
- **Railway**
- **Supabase**
- **PlanetScale** (MySQL alternative)

## 📊 Analytics & Tracking

The app tracks:
- QR code scans
- Landing page visits
- Lead submissions
- Campaign performance

## 🔜 Roadmap

- [ ] User authentication
- [ ] Real-time dashboard with Socket.io
- [ ] Advanced analytics
- [ ] A/B testing for landing pages
- [ ] Drag-and-drop page builder
- [ ] Custom domain support
- [ ] Team collaboration features
- [ ] Export leads to CSV
- [ ] Integration with CRMs

## 🐛 Troubleshooting

**Database connection fails:**
- Check DATABASE_URL format
- Ensure PostgreSQL is running
- Verify credentials

**Emails not sending:**
- Verify SMTP credentials
- Check spam folder
- Test with Mailtrap.io first

**QR codes not generating:**
- Check console for errors
- Verify URL format
- Ensure landing page exists

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please open an issue first to discuss changes.

## 💬 Support

For issues or questions:
1. Check existing issues
2. Create new issue with details
3. Contact support

---

Built with ❤️ using Next.js and TypeScript
