const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const GoogleStrategy = require("passport-token-google").Strategy;
const { JWT_SECRET } = require("./configuration");
const User = require("./models/users");

// JSON WEB TOKENS STRATEGY
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: JWT_SECRET,
    },
    async (payload, done) => {
      try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);

        // If user doesn't exists, handle it
        if (!user) {
          return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// Google OAuth Strategy
passport.use(
  "googleToken",
  new GoogleStrategy(
    {
      clientID:
        "480413171171-b189t9nlospf72nrjl580333e5mvo6bm.apps.googleusercontent.com",
      clientSecret: "4FAmBscy1RbtIShTymGDH9P0",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Display full user profile
        console.log("profile", profile);
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);

        //Check if User already exist
        const existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
          console.log("User already Exists in the DB");
          return done(null, existingUser);
        }

        console.log("User does not Exist in the DB");
        // Else create a new User
        const newUser = new User({
          method: "google",
          google: {
            id: profile.id,
            email: profile.emails[0].value,
          },
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

// LOCAL STRATEGY
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        // Find the user given the email
        const user = await User.findOne({ "local.email": email });

        // If not, handle it
        if (!user) {
          return done(null, false);
        }

        // Check if the password is correct
        const isMatch = await user.isValidPassword(password);

        // If not, handle it
        if (!isMatch) {
          return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
