const express = require("express");
const handlebars = require("express-handlebars").create({
  extname: "hbs",
});
const defaultTitle = require("../middlewares/defaultTitle");

function expressConfig(app) {
  // Setup the view engine
  app.engine(".hbs", handlebars.engine);
  app.set("view engine", ".hbs");

  // Middleware setup the body parser
  app.use(express.urlencoded({ extended: true }));
  //Setup the static files
  app.use("/static", express.static("static"));
  // Middleware setup title
  app.use(defaultTitle("SoftUni Accommodation"));
}

module.exports = {
  expressConfig,
};
