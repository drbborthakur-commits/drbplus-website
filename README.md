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
Alchemist Solutions) on GoDaddy. Nothing on this guide depends on it.

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

## 2. Razorpay — done

Account is **activated**. Cards and Netbanking show green ticks.

Your permanent payment link: **https://razorpay.me/@drbplus**

To put it live:
1. GitHub → `drbplus-com` → `index.html` → pencil icon
2. Find the Razorpay entry inside `paymentMethods` — it still has `____`
3. Replace `____` with `https://razorpay.me/@drbplus`, leave `on: true`
4. Commit changes

Notes:
- The link lets patients type any amount. The ₹500 is shown on the
  website, not enforced by Razorpay. Fine for now.
- Settlements land in your registered bank account, usually T+2 working days.
- Pricing is roughly 2% + GST per transaction.

**Still to check:** whether **UPI** is enabled. Payments home → scroll to
payment methods → if UPI has no green tick, tap "Enable more methods".
Most of your patients will pay that way.

**Test once:** pay ₹1 through the link yourself, then check Transactions
and Settlements to confirm it reaches the bank.

---

## 3. Other payment lines still showing `____`

These are live on the page with blanks in them. Either fill them in or
set `on: false`:

- Bank transfer (account no. + IFSC + branch)
- PhonePe / Paytm number
- Cheque (payable-to name)

UPI (`9401216987@airtel`), cash, card, Razorpay and send-screenshot are
already filled.

---

## 4. Pages Razorpay expects on a payment website

Razorpay's compliance checks look for **Terms & Conditions, Privacy
Policy, Refund/Cancellation Policy and Contact Us**. drbplus.com shows
the fee and contact details but has none of the first three as pages.
Not blocking anything right now since the account is already activated,
but worth adding — ask me and I'll write all four.

---

## 5. Still outstanding

- Clinic photographs (section stays hidden until added)
- Google review link — needs a Google Business Profile for each clinic;
  this also fixes the map pins
- GA4 analytics ID
- Pharmacy section — written and commented out in the HTML, ready to
  switch on when it opens
- Assamese version — offered, pending your line-by-line check of the
  medical wording

---

## 6. The React app (optional, only if you go back to it)

If you ever point the React site at a domain, it uses server-side
Razorpay checkout instead of a payment link, and needs API keys:

1. Razorpay dashboard → Account & Settings → API Keys → Generate Key
2. Copy the **Key ID** and **Key Secret**
3. Vercel → `drbplus-website` project → Settings → Environment Variables:
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
4. Redeploy

Keep the Key Secret private — never paste it into `index.html` or any
public repo.

---

## 7. Current DNS (don't break this)

- Domain registered at GoDaddy, 3-year term to Sept 2029
- Nameservers: still GoDaddy's
- A record `@` → `216.198.79.1` (Vercel)
- CNAME `www` → drbplus.com
- Apex is primary — no www redirect, `drbplus.com` is what loads
