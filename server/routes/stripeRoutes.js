



const express = require('express');
const Stripe = require('stripe');
const crypto = require('crypto');
const Download = require('../models/Download');

 require('dotenv').config();  // checking the .env file is loading
const router = express.Router();

// Debugging: check API key show  yes ya no
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('❌ STRIPE_SECRET_KEY not found. Check your .env file.');
}

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Checkout Session create
router.post('/create-checkout-session', async (req, res) => {
  const { email } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Resume Download',
            },
            unit_amount: 299, // $2.99
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      customer_email: email,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Session Verify 
router.get('/verify-session', async (req, res) => {
  const { session_id } = req.query;
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status === 'paid') {
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

      const entry = new Download({
        email: session.customer_email,
        token,
        expiresAt,
      });

      await entry.save();
      return res.json({ token });
    }
    res.status(400).json({ error: 'Payment not completed' });
  } catch (err) {
    console.error('Verify Session Error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
