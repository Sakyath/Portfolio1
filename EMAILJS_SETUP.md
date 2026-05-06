# EmailJS Setup Guide

Follow these steps to enable email functionality in your contact form:

## Step 1: Create an EmailJS Account
1. Go to [emailjs.com](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email

## Step 2: Get Your Public Key
1. Log in to your EmailJS dashboard
2. Go to **Account** (top right)
3. Copy your **Public Key**
4. Replace `YOUR_EMAILJS_PUBLIC_KEY` in `src/components/sections/ContactSection.jsx` with this key

## Step 3: Create an Email Service
1. In the dashboard, click **Email Services** (left sidebar)
2. Click **Add Service**
3. Choose your email provider:
   - **Gmail**: Select "Gmail", click **Connect** and authorize
   - **Other Email**: Fill in your SMTP details
4. Click **Create Service**
5. Note your **Service ID** (looks like: `service_xxxxx`)

## Step 4: Create an Email Template
1. Click **Email Templates** (left sidebar)
2. Click **Create New Template**
3. Use this template:

```
From: {{from_name}} ({{from_email}})

Message:
{{message}}
```

4. Set up the template variables:
   - In the template editor, the variables `{{from_name}}`, `{{from_email}}`, and `{{message}}` should be recognized
5. Set **To Email** to: `{{to_email}}`
6. Click **Save**
7. Note your **Template ID** (looks like: `template_xxxxx`)

## Step 5: Update Your Code
In `src/components/sections/ContactSection.jsx`, replace these values on lines 5-6:

```javascript
emailjs.init('YOUR_EMAILJS_PUBLIC_KEY') // ← Paste your Public Key here

// Later in the handleSubmit function:
await emailjs.send(
  'YOUR_SERVICE_ID',      // ← Paste your Service ID here
  'YOUR_TEMPLATE_ID',     // ← Paste your Template ID here
  templateParams
)
```

## Example Values (Don't use these!)
- Public Key: `c6iqn2s0a1b2c3d4e5f6g7h8`
- Service ID: `service_a1b2c3d4e5f6g7h8`
- Template ID: `template_x1y2z3a4b5c6d7e8`

## Testing
1. Save your changes
2. Start your development server: `npm run dev`
3. Open your portfolio in the browser
4. Go to the Contact section
5. Fill in the form with test data
6. Click "Send Message"
7. Check your email (bonagirisakyath@gmail.com) for the message

## Troubleshooting
- **"Missing template ID"**: Make sure you've replaced both the Service ID and Template ID
- **"Missing credentials"**: Make sure you've replaced the Public Key
- **Email not received**: Check your EmailJS dashboard for failed messages
- **Spam folder**: Check your email's spam folder

## Important Notes
- Keep your Public Key visible in the code (it's public)
- Keep your Service ID and Template ID visible in the code
- Your email credentials are never exposed in the browser
- EmailJS sends emails on your behalf securely

## Free Tier Limits
EmailJS free account includes:
- Up to 200 emails per day
- Unlimited templates
- No credit card required
