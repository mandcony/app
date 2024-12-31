const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Stripe = require('stripe');

// Initialize Express app and Stripe instance
const app = express();
const stripe = Stripe('sk_test_51Qa6FaGp5CnbRec5RNvBbAyhVziBi1wjUGQiHg0NwtstSmrZixQfi0vUtbSiXBwOIPxkXZd425upOPQAMyQTsd0800GcSHePVm');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Stripe Payment Server is Running');
});

// Create Payment Intent
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency } = req.body;

    if (!amount || !currency) {
      return res.status(400).json({
        error: 'Missing amount or currency in the request body.',
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error.message);
    res.status(500).json({
      error: error.message,
    });
  }
});

// Server Configuration
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
