const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const User = require("./../models/userModel");

module.exports.passportGoogleAuth = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "1030768330832-hujj03dc6nmft0vsnmi5ri4jaulc7mm0.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://127.0.0.1:8000/api/v1/auth/google/callback",
        // callbackURL: "http://127.0.0.1:5173",
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        try {
          const { given_name, family_name, email } = profile._json;

          let existingUser = await User.findOne({ email });
          if (existingUser) {
            return done(null, existingUser);
          }

          // console.log("Creating new user...");
          const newUser = await User.create({
            firstName: given_name,
            lastName: family_name,
            email,
            password: "test1234",
            isVerified: true,
            authType: "google",
          });
          //   await newUser.save();
          return done(null, newUser);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};
