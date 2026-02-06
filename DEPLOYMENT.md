# 🚀 GitHub Setup & Deployment Guide

## Step 1: Set Up Git Locally

Open your terminal in the `qr-lead-generator` folder and run:

```bash
# Configure your Git identity (use your GitHub email)
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"

# Initialize repository (if not already done)
git init
git branch -m main

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: QR Lead Generator"
```

## Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `qr-lead-generator` (or your choice)
3. Description: "Dynamic QR code generator with landing page builder and lead capture"
4. Choose **Private** (recommended) or Public
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 3: Push to GitHub

GitHub will show you commands. Use these:

```bash
# Add GitHub as remote (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/qr-lead-generator.git

# Push code to GitHub
git push -u origin main
```

If prompted for credentials:
- Username: Your GitHub username
- Password: Use a **Personal Access Token** (not your password)
  - Create token at: https://github.com/settings/tokens
  - Select scopes: `repo` (full control)
  - Copy the token and use it as password

## Step 4: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Easiest)

1. Go to https://vercel.com and sign in with GitHub
2. Click "Add New Project"
3. Import your `qr-lead-generator` repository
4. Configure:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./`
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)

5. Add Environment Variables:
   ```
   DATABASE_URL=your-database-url
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASSWORD=your-sendgrid-key
   EMAIL_FROM=noreply@yourdomain.com
   CONSULTANT_EMAIL=consultant@yourdomain.com
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   ```

6. Click "Deploy"

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: qr-lead-generator
# - Directory: ./
# - Want to override settings? No

# Deploy to production
vercel --prod
```

## Step 5: Set Up Database

### Option 1: Vercel Postgres (Recommended)

1. In Vercel Dashboard → Your Project → Storage
2. Click "Create Database" → "Postgres"
3. Copy the `POSTGRES_PRISMA_URL` 
4. Add to Environment Variables as `DATABASE_URL`
5. Redeploy

### Option 2: Supabase (Free Tier)

1. Go to https://supabase.com
2. Create new project
3. Get connection string from Settings → Database
4. Format: `postgresql://postgres:[password]@[host]:5432/postgres`
5. Add to Vercel environment variables

### Initialize Database

After database is set up:

```bash
# Run this locally with your production DATABASE_URL
npx prisma db push
```

Or add to your Vercel build command:
```
npm run build && npx prisma generate
```

## Step 6: Set Up Email (SendGrid)

1. Go to https://sendgrid.com (free tier: 100 emails/day)
2. Create account
3. Settings → API Keys → Create API Key
4. Copy the API key
5. Add to Vercel environment variables:
   ```
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASSWORD=your-sendgrid-api-key
   EMAIL_FROM=noreply@yourdomain.com
   CONSULTANT_EMAIL=consultant@yourdomain.com
   ```

## Step 7: Test Your Deployment

1. Visit your Vercel URL (e.g., `https://qr-lead-generator.vercel.app`)
2. Create a test campaign
3. Generate a QR code
4. Build a landing page
5. Test form submission
6. Check if email notification arrives

## 🔄 Updating Your App

Whenever you make changes:

```bash
# Make your code changes
# Then:
git add .
git commit -m "Description of changes"
git push

# Vercel automatically redeploys!
```

## 🎯 Custom Domain (Optional)

1. In Vercel → Project Settings → Domains
2. Add your domain (e.g., `leads.yourcompany.com`)
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_APP_URL` environment variable

## 🐛 Troubleshooting

### Build Fails
- Check Vercel build logs
- Ensure all dependencies in `package.json`
- Verify environment variables are set

### Database Connection Error
- Verify `DATABASE_URL` format
- Check IP allowlist (Supabase/Railway)
- Run `npx prisma generate` locally

### Emails Not Sending
- Verify SMTP credentials
- Check SendGrid dashboard for errors
- Test with a simple email first

### QR Codes Not Working
- Check `NEXT_PUBLIC_APP_URL` is set correctly
- Ensure landing pages are published
- Verify slug matches QR code URL

## 📚 Next Steps

1. Set up custom domain
2. Enable authentication
3. Add more landing page templates
4. Implement analytics
5. Add A/B testing

## 🆘 Need Help?

- Vercel Docs: https://vercel.com/docs
- Prisma Docs: https://www.prisma.io/docs
- Next.js Docs: https://nextjs.org/docs

---

**Quick Reference:**
- GitHub: Your repository URL
- Vercel: Your deployment URL
- Database: Connection string
- Email: SMTP credentials
