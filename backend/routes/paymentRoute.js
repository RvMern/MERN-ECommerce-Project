const express= require("express");
const route = express.Router();

const {isAuthenticatedUser} = require("../middleware/auth");
const {processPayment, sendStripeApiKey,} = require("../controller/paymentCtrl");

route.post("/process",isAuthenticatedUser, processPayment);
route.get("/stripeapikey",isAuthenticatedUser, sendStripeApiKey);


module.exports = route;