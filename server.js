const express = require("express");
const dotenv = require("dotenv");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const path = require("path");

dotenv.config();

const app = express();

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// ---------------------- WEBHOOK ----------------------
app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const webhookSecret = process.env.WEBHOOK_SECRET;

  const receivedSignature = req.headers["x-razorpay-signature"];

  console.log("Content-Type:", req.headers["content-type"]);
  console.log("Signature:", receivedSignature);
  console.log("Body:", req.body);

  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(req.body)
    .digest("hex");

  if (receivedSignature === expectedSignature) {
    console.log("✅ Webhook Verified");

    const event = JSON.parse(req.body.toString());

    console.log("Event:", event.event);

    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;

      console.log("Payment ID:", payment.id);
      console.log("Order ID:", payment.order_id);
      console.log("Amount:", payment.amount / 100);
      console.log("Status:", payment.status);
      console.log("Method:", payment.method);
    }

    return res.status(200).send("OK");
  }

  console.log("❌ Invalid Signature");
  res.status(400).send("Invalid Signature");
});

// JSON parser
app.use(express.json());

// ---------------------- RAZORPAY ----------------------
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ---------------------- HOME ----------------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ---------------------- CREATE PAYMENT LINK ----------------------
app.post("/payment-link", async (req, res) => {
   const { amount } = req.body;

  try {
    const payment = await razorpay.paymentLink.create({
     
      amount: Number(amount) * 100, // ₹500
      currency: "INR",
      accept_partial: false,
      description: "Payment to Yashwanth",

      callback_url: "https://payment-gateway-backend-ud1i.onrender.com",
      callback_method: "get",
    });

    res.status(200).json({
      success: true,
      id: payment.id,
      short_url: payment.short_url,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ---------------------- START SERVER ----------------------
app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
