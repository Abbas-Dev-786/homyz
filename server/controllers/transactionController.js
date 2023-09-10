const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");
const Property = require("../models/propertyModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./FactoryHandler");
const AppError = require("../utils/AppError");

const CLIENT_URL =
  process.env.NODE_ENV === "dev"
    ? `http://localhost:5173`
    : `https://homyz-amb.netlify.app`;

module.exports.createCheckout = catchAsync(async (req, res, next) => {
  const property = await Property.findById(req.params.propertyId);

  if (!property) {
    return next(new AppError("Property does not exists", 400));
  }

  if (property.isBooked) {
    return next(new AppError("Property already Booked", 400));
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: property.title,
            description: property.description,
          },
          unit_amount: property.price * 100,
        },
        quantity: 1,
      },
    ],

    payment_intent_data: {
      metadata: {
        property: req.params.propertyId,
      },
    },
    customer_email: req.user.email,
    client_reference_id: req.params.propertyId,
    mode: "payment",
    success_url: `${CLIENT_URL}/payment/success`,
    cancel_url: `${CLIENT_URL}/payment/failed`,
  });

  res.json({ id: session.id });
});

const createCheckout = async (property, email, price, status) => {
  const user = (await User.findOne({ email })).id;

  if (status === "success") {
    await Transaction.create({ property, user, price, status: "success" });
    await Property.findByIdAndUpdate(
      property,
      { isBooked: true, buyer: user },
      { runValidators: true, new: true }
    );
  } else {
    await Transaction.create({ property, user, price, status: "failed" });
  }
};

module.exports.webhook = (req, res, next) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log(event);
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const property = session.client_reference_id;
    const email = session.customer_email;
    const price = session.amount_total / 100;

    createCheckout(property, email, price, "success");
  } else if (event.type === "charge.failed") {
    const session = event.data.object;

    const property = session.metadata.property;
    const email = session.billing_details.email;
    const price = session.amount / 100;

    createCheckout(property, email, price, "fail");
  }

  res.json({ received: true });
};

module.exports.setId = (req, res, next) => {
  req.params.userId = req.user._id;

  next();
};

// exports.createTransaction = factory.createDoc(Transaction);
// exports.getTransaction = factory.getDoc(Transaction);

exports.getTransaction = catchAsync(async (req, res, next) => {
  const transactions = await Transaction.find({ user: req.params.userId }).sort(
    "-createdAt"
  );

  res.status(200).json({
    status: "success",
    results: transactions.length,
    data: transactions,
  });
});

exports.getAllTransactions = factory.getAllDocs(Transaction);
exports.updateTransaction = factory.updateDoc(Transaction);
exports.deleteTransaction = factory.deleteDoc(Transaction);
