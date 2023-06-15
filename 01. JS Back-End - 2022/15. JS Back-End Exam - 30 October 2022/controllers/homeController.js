const homeController = require("express").Router();
const { lastAdded } = require("../services/dataService");

homeController.get("/", async (req, res) => {
  const blogs = await lastAdded();

  res.render("home", {
    title: "Home Page",
    blogs,
  });
});

// TODO load real data
homeController.get("/profile", async (req, res) => {
  res.render("profile", {
    title: "Profile Page",
  });
});

module.exports = homeController;
