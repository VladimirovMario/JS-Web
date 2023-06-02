const express = require("express");
const handlebars = require("express-handlebars").create({
  extname: "hbs",
});

const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth')
const userNav = require("../middlewares/userNav");
const defaultTitle = require("../middlewares/defaultTitle");

const jwtSecret = 'No matter what we write here'


function expressConfig(app) {
  // Setup the view engine
  app.engine(".hbs", handlebars.engine);
  app.set("view engine", ".hbs");

  // Middleware setup the body parser
  app.use(express.urlencoded({ extended: true }));
  //Setup the static files
  app.use("/static", express.static("static"));
  // Middleware
  app.use(cookieParser());
  // Middleware for verifying Token. It must be loaded after cookieParser
  app.use(auth(jwtSecret));
  // Middleware It must be loaded after auth(jwtSecret)
  app.use(userNav())
  // Middleware for title setup
  app.use(defaultTitle("SoftUni Accommodation"));
}

module.exports = {
  expressConfig,
};
