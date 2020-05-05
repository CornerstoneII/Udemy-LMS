const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost/APIAuthentication");

if (process.env.NODE_ENV === "test") {
  mongoose.connect("mongodb://localhost/APIAuthenticationTEST", {
    useNewUrlParser: true,
  });
} else {
  mongoose.connect("mongodb://localhost/APIAuthentication", {
    useNewUrlParser: true,
  });
}

const app = express();

app.use(cors());

if (!process.env.NODE_ENV === "test") {
  app.use(morgan("dev"));
}

// Middlewares
app.use(bodyParser.json());

// Routes
app.use("/users", require("./routes/users"));

// Start the server
// const port = process.env.PORT || 3000;
// app.listen(port);
// console.log(`Server listening at ${port}`);
module.exports = app;
