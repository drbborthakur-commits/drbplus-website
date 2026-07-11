// /api/verify-payment.js
// Verifies the Razorpay payment signature server-side so a booking can't
// be faked by tampering with the frontend response.
// Requires RAZORPAY_KEY_SECRET in Vercel environment variables.

import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    res.status(500).json({ ok: false, error: "Payment gateway not configured." });
    return;
  }

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      booking,
    } = req.body || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      res.status(400).json({ ok: false, error: "Missing payment details." });
      return;
    }

    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (isValid) {
      // Payment verified. Booking details are in `booking`.
      // TODO (optional next step): store this in a database or send a
      // notification email/SMS to the clinic here. For now, the frontend
      // opens a pre-filled WhatsApp message to the clinic as confirmation.
      console.log("Verified booking:", booking, razorpay_payment_id);
      res.status(200).json({ ok: true, paymentId: razorpay_payment_id });
    } else {
      res.status(400).json({ ok: false, error: "Signature mismatch." });
    }
  } catch (err) {
    console.error("verify-payment error:", err);
    res.status(500).json({ ok: false, error: "Verification failed." });
  }
}
