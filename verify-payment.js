// /api/create-order.js
// Creates a Razorpay order for the booking advance amount.
// Requires environment variables set in Vercel:
//   RAZORPAY_KEY_ID
//   RAZORPAY_KEY_SECRET

import Razorpay from "razorpay";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    res.status(500).json({
      error:
        "Payment gateway is not configured yet. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Vercel environment variables.",
    });
    return;
  }

  try {
    const { amount } = req.body || {};
    const rupees = Number(amount) > 0 ? Number(amount) : 200;

    const instance = new Razorpay({ key_id: keyId, key_secret: keySecret });

    const order = await instance.orders.create({
      amount: Math.round(rupees * 100), // paise
      currency: "INR",
      receipt: `drbplus_${Date.now()}`,
    });

    res.status(200).json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId, // safe to expose publicly — this is the publishable key ID
    });
  } catch (err) {
    console.error("create-order error:", err);
    res.status(500).json({ error: "Could not create payment order." });
  }
}
