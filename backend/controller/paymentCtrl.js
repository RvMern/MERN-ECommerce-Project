const asyncError = require("../middleware/asyncError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Process Stripe Payment
const processPayment = asyncError(async(req,res,next)=>{
    const payment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
            company: "EShopping"
        }
    });
    res.json({
        success: true,
        client_secret: payment.client_secret
    });

});

// Send Stripe API Key
const sendStripeApiKey = asyncError(async(req,res,next)=>{
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    });
});


module.exports = {processPayment, sendStripeApiKey};

