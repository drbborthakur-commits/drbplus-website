# DRB PLUS Website — Setup Guide
*Updated 7 September 2026*

## What exists now

Two separate things, both live:

| | **drbplus.com** (main site) | **drbplus-website.vercel.app** (React app) |
|---|---|---|
| Repo | `drbborthakur-commits/drbplus-com` | `drbborthakur-commits/drbplus-website` |
| Build | Plain HTML/CSS/JS, no build step | React + Vite |
| Editable from iPhone | Yes, GitHub web editor | Harder — needs a build |
| Status | **Live at drbplus.com since 5 Sept 2026** | Test/backup site |

The static site is the one patients see. Edit that one unless there's a
reason not to.

`drbplus.in` is still held by the previous developer (Ashim Sen Gupta /
Alchemist Solutions) on GoDaddy. Nothing here depends on it.

---

## Open items, in order

1. Paste the payment details into `drbplus-com` → `index.html` (section 3 below)
2. Upload terms.html, privacy.html, refunds.html and add the footer links (section 4)
3. Replace `payment-qr.jpg` with a QR for the new HDFC UPI ID
4. Check UPI is enabled in the Razorpay dashboard
5. Pay ₹1 through the Razorpay link and confirm it settles

---

## 1. Editing content

Everything editable sits in one `var DRB = {...}` block at the top of
`index.html`, marked **EDIT EVERYTHING HERE**.

**To edit:** GitHub → `drbplus-com` → `index.html` → pencil icon →
change the value → **Commit changes**. Vercel redeploys in about a minute.

Current settings:
- Consultation fee: **₹500** (same for advance booking and walk-in)
- Credentials line: **Neuro-psychiatrist & De-addiction Specialist**
- Letterhead credentials: **MBBS, D.P.M., Reg. 17886-AMC**
- Clinics: Margherita (10am–2pm, daily except Saturday), Digboi
  (Mon–Fri, 3–6pm), Makum / Bharat Clinic (Saturday, 8am–2pm)

New images go in the same repo root and are referenced by filename in
the config.

---

## 2. Razorpay — account done

Account is **activated**. Cards and Netbanking show green ticks.

Permanent payment link: **https://razorpay.me/@drbplus**

Notes:
- The link lets patients type any amount. The ₹500 is shown on the
  website, not enforced by Razorpay.
- Settlements land in the registered bank account, usually T+2 working days.
- Pricing is roughly 2% + GST per transaction.
- Still to check: whether **UPI** is enabled. Payments home → payment
  methods → if UPI has no green tick, tap "Enable more methods". Most
  patients will pay that way.
- Test once: pay ₹1 through the link, then check Transactions and
  Settlements.

---

## 3. Payment details for the config

All confirmed. These go into `drbplus-com` → `index.html`, replacing the
`____` placeholders:

| Method | Value |
|---|---|
| UPI | `9401216987.1@hdfc` (replaces the old Airtel ID) |
| Razorpay | `https://razorpay.me/@drbplus` |
| Bank transfer | DRB PLUS PRIVATE LIMITED · A/c 99999401216987 · HDFC Bank · IFSC HDFC0005526 |
| GPay / PhonePe / Paytm | 9435166121 |
| Cheque | Payable to **DRB PLUS PRIVATE LIMITED** |
| Cash, card, send-screenshot | Already configured |

Two things to get right:
- `upiName` should match the account holder name as the bank prints it,
  or transfers from some apps flag a name mismatch.
- `payment-qr.jpg` in the repo is still the QR for the **old Airtel** UPI
  ID. Generate a new QR from the HDFC app and upload it over the same
  filename, or the scan and the printed ID won't match.

---

## 4. Policy pages

Written 7 September 2026: `terms.html`, `privacy.html`, `refunds.html`.
Standalone pages, same navy/cream styling, no build step.

**To publish:** `drbplus-com` → Add file → Upload files → all three →
Commit. Then add to the footer in `index.html`:

```html
<a href="terms.html">Terms</a> ·
<a href="privacy.html">Privacy</a> ·
<a href="refunds.html">Refunds</a>
```

Two policy decisions made in `refunds.html`, change them if you disagree:
- Full refund if cancelled **at least 4 hours** before the appointment
- No-shows forfeit the fee, but get one adjustment against a future visit

These cover what Razorpay's compliance checks look for. They are not
lawyer-drafted — worth a local legal check if a dispute ever arises.

---

## 5. Still outstanding

- Clinic photographs (section stays hidden until added)
- Google Business Profile for Margherita and Digboi — fixes the map pins
  and supplies the review link the site is waiting for
- GA4 analytics ID
- Pharmacy section — written and commented out in the HTML, ready to
  switch on when it opens
- Assamese version — offered, pending a line-by-line check of the
  medical wording

---

## 6. The React app

Kept as a backup. Not linked from anywhere and not worth maintaining in
parallel — every fee or timing change would have to be made twice.

Its `index.html` was corrected on 7 September 2026: credentials now read
MBBS, D.P.M. (previously said MD Psychiatry), Makum added, and a canonical
tag added pointing at drbplus.com so search engines treat this copy as a
duplicate rather than a competitor.

If it is ever brought back into use, it needs Razorpay API keys rather
than a payment link:

1. Razorpay dashboard → Account & Settings → API Keys → Generate Key
2. Vercel → `drbplus-website` → Settings → Environment Variables:
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
3. Redeploy

Never paste the Key Secret into `index.html` or any public repo.

---

## 7. Current DNS (don't break this)

- Domain registered at GoDaddy, 3-year term to Sept 2029
- Nameservers: still GoDaddy's
- A record `@` → `216.198.79.1` (Vercel)
- CNAME `www` → drbplus.com
- Apex is primary — no www redirect, `drbplus.com` is what loads
