// import built-in modules
const crypto = require("crypto");
// import 3rd party modules
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");
// import custome modules
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Email = require("../utils/Email");

// ========= oAuth setup ============
const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "postmessage"
);

// ============== HELPER function =============
const signToken = (id, authType) =>
  // returns a signed jwt
  jwt.sign({ id, authType }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

// ============== HELPER function =============
const createURL = async (user, key, req, routeName) => {
  // returns a url address for emails
  const token = await user.createHashToken(key);
  const CLIENT_URL =
    process.env.NODE_ENV === "dev"
      ? `http://localhost:5173/${routeName}`
      : `https://homyz-amb.netlify.app/${routeName}`;
  const URL = `${CLIENT_URL}/${token}`;
  // const URL = `${req.protocol}://${req.hostname}:8000/api/v1/auth/${routeName}/${token}`;

  return URL;
};

// ============== HELPER function =============
const createHashToken = (token) => {
  // returns a hashed token
  return crypto.createHash("sha256").update(token).digest("hex");
};

// ============== HELPER function =============
const createAndSendToken = (res, user) => {
  // creates token and send response to user
  const token = signToken(user._id, user.authType);

  user.password = undefined;
  user.isActive = undefined;
  user.updatedAt = undefined;

  res.status(200).json({ status: "success", data: { user, token } });
};

// ========= GOOGLE AUTH handler ============
module.exports.googleLogin = catchAsync(async (req, res, next) => {
  const { tokens } = await oAuth2Client.getToken(req.body.code);

  const { data } = await axios.get(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    }
  );

  const {
    email,
    given_name: firstName,
    family_name: lastName,
    email_verified: isVerified,
  } = data;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      firstName,
      lastName,
      email,
      isVerified,
      password: "test1234",
      authType: "google",
    });
  }

  if (user.authType === "jwt") {
    return next(
      new AppError(
        "Login with email and password. Google login is not implemented on this account.",
        400
      )
    );
  }

  if (!user.isActive) {
    return next(new AppError("user does not exists", 404));
  }

  createAndSendToken(res, user);
});

// ============== REGISTER handler =============
module.exports.register = catchAsync(async (req, res, next) => {
  // create user in DB
  const user = await User.create(req.body);

  // sanitize fields
  user.password = undefined;
  user.isActive = undefined;
  user.updatedAt = undefined;

  // send response to user
  res.status(201).json({ status: "success", data: user });

  // send welcome mail to user
  await new Email(user).sendWelcome();
});

// ============== LOGIN handler =============
module.exports.login = catchAsync(async (req, res, next) => {
  // get user email & password
  const { email, password } = req.body;

  // validation checks
  if (!email || !password) {
    return next(new AppError("Email and password are required", 400));
  }

  // find user in DB
  const user = await User.findOne({ email }).select("+password");

  // check password
  if (!user || !(await user.comparePasswords(password, user.password))) {
    return next(
      new AppError("Invalid credentials. Please check email or password", 400)
    );
  }

  // check for google login
  if (user.authType === "google") {
    return next(new AppError("Please Login with google.", 400));
  }

  // check user is deleted
  if (!user.isActive) {
    return next(new AppError("user does not exists", 404));
  }

  // check user email is verified via email or not
  if (!user.isVerified) {
    const verificationUrl = await createURL(
      user,
      "emailVerifyToken",
      req,
      "verifyEmail"
    );

    // send email verification mail
    await new Email(user, verificationUrl).sendEmailVerification();

    return next(
      new AppError(
        "Email not verified. A verification email has been sent to your email. Please verify your email.",
        400
      )
    );
  }

  // if each checks are passed then create and send token to user
  createAndSendToken(res, user);
});

// ============== VERIFY_EMAIL handler =============
module.exports.verifyEmail = catchAsync(async (req, res, next) => {
  // create cryptographic hash from token in params
  const emailVerifyToken = createHashToken(req.params.token);

  // find user via hashed token
  const user = await User.findOne({ emailVerifyToken });

  // checks
  if (!user) return next(new AppError("User does not exists.", 404));

  if (user.isVerified)
    return next(new AppError("User is already verified.", 400));

  // if all good then set isVerified to true
  user.isVerified = true;
  // user.emailVerifyToken = undefined;
  await user.save({ validateBeforeSave: false });

  // send success reponse to user
  res
    .status(200)
    .json({ status: "success", message: "user verified. Please Login" });
});

// ============== FORGOT_PASSWORD handler =============
module.exports.forgotPassword = catchAsync(async (req, res, next) => {
  // body checks
  if (!req.body.email) {
    return next(new AppError("Please enter email", 400));
  }

  // find user by email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("user does not exists", 404));
  }

  // create url and send password-reset mail to user
  const passwordResetUrl = await createURL(
    user,
    "passwordResetToken",
    req,
    "resetPassword"
  );
  await new Email(user, passwordResetUrl).sendPasswordReset();

  // send success response to user
  res.status(200).json({
    status: "success",
    message: "Mail has been sent to your email address",
  });
});

// ============== RESET_PASSWORD handler =============
module.exports.resetPassword = catchAsync(async (req, res, next) => {
  // get token from url
  const passwordResetToken = createHashToken(req.params.token);

  // find user by token and check for expiry
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  //checks
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  if (!req.body.confirmPassword) {
    return next(new AppError("Please confirm your password", 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new AppError("password not matching", 400));
  }

  // set password and santize data
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // create and token to user
  createAndSendToken(res, user);
});

// ============== UPDATE_PASSWORD handler =============
exports.updatePassword = catchAsync(async (req, res, next) => {
  // find user
  const user = await User.findById(req.user.id).select("+password");

  // checks;
  if (!req.body.currentPassword) {
    return next(new AppError("Enter currentPassword", 400));
  }

  // check prevous password
  if (!(await user.comparePasswords(req.body.currentPassword, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  // checks
  if (!req.body.confirmPassword || !req.body.password) {
    return next(new AppError("please enter password and confirmPassword", 400));
  }

  if (req.body.confirmPassword !== req.body.password) {
    return next(new AppError("Confirmpassword and password not matching", 400));
  }

  // set new password
  user.password = req.body.password;
  await user.save();

  // create and token to user
  createAndSendToken(res, user);
});

// ============== MIDDLEWARE =============
module.exports.protect = catchAsync(async (req, res, next) => {
  // allows access to only signed users
  let token;

  // get token from request headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // verify jwt
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // find current user from jwt id
  const currentUser = await User.findById(decoded.id);
  if (!currentUser || !currentUser.isActive) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  // check for user is verified via email or not
  if (!currentUser.isVerified) {
    const verificationUrl = await createURL(
      currentUser,
      "emailVerifyToken",
      req,
      "verifyEmail"
    );

    await new Email(currentUser, verificationUrl).sendEmailVerification();

    return next(new AppError("user is not verified please verify user"));
  }

  req.user = currentUser;
  next();
});

// ============== MIDDLEWARE =============
module.exports.restrictTo = (...roles) => {
  // allows role based access to users
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};
