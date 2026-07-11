# DRB PLUS Website — Setup Guide

## What this is
A full redesign of drbplus.in: hero, about, services, both clinics with
exact hours, an online appointment booking form with Razorpay payment,
a live embed of your existing AI chatbot, WhatsApp CTAs throughout, and
a FAQ section. Built the same way as your chatbot (React + Vite +
Vercel) so you can edit it from GitHub in Safari the same way.

## 1. Edit content before launch
Open `src/content.js` — every clinic fact (hours, phone, fees, services,
FAQs) lives in this one file. Two things to check/update before going
live:
- `CLINIC.credentials` — confirm the exact degree/registration line you want shown
- `BOOKING_AMOUNT_INR` — currently ₹200 as a placeholder online booking advance. Change to your real amount.

## 2. Set up Razorpay (for online payments)
1. Go to razorpay.com → Sign Up with your clinic email
2. Complete KYC (PAN, bank account, address proof)
3. Once approved: Settings → API Keys → Generate Key → copy the **Key ID** and **Key Secret**
4. In Vercel (after deploying, see below): Project → Settings → Environment Variables → add:
   - `RAZORPAY_KEY_ID` = your Key ID
   - `RAZORPAY_KEY_SECRET` = your Key Secret
5. Redeploy — payments go live automatically, no code changes needed.

Until you add these, the booking form will show a friendly error
instead of crashing — patients can still use "Book via WhatsApp instead".

## 3. Deploy (same pattern as your chatbot)
1. Create a new GitHub repo (e.g. `drbplus-website`)
2. Upload all these files to it (GitHub web: Add file → Upload files → drag the whole folder contents)
3. Go to vercel.com → New Project → Import the repo → Deploy
4. You'll get a URL like `drbplus-website.vercel.app` — test everything there first

## 4. Point drbplus.in at the new site
Once you're happy with the Vercel URL:
1. In Vercel: Project → Settings → Domains → Add `drbplus.in`
2. Vercel will show you DNS records (an A record or CNAME) to add
3. Go to wherever you registered drbplus.in (GoDaddy/BigRock/etc.) → DNS settings → add those records
4. Takes up to a few hours to switch over. Your old PHP host can be cancelled after you confirm the new site is live.

## 5. What's already wired up
- Booking form → Razorpay checkout → server-side signature verification → WhatsApp auto-confirmation message
- Floating "AI" button opens your live chatbot (drbplus-chatbot.vercel.app) in a chat window on top of the site
- Floating WhatsApp button on every page
- Google Maps embed + directions links for both clinics
- Fully responsive for phones (built and tested mobile-first)

## Things to double check with me before going live
- Real consultation fees (currently a ₹200 placeholder advance only)
- Exact wording of your registration/credentials line
- Whether you want the full consultation fee collected online, or just a booking advance (current default)
