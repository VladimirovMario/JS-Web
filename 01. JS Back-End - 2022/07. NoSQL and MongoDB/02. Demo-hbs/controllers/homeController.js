const homeController = require("express").Router();

homeController.get("/", (req, res) => {
  res.render("home", {
    title: "MongoDB Demo",
  });
});

module.exports = homeController;
