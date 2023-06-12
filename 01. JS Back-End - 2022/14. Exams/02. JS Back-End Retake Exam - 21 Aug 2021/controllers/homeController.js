const homeController = require("express").Router();
const { getRecent, getAll } = require("../services/housingService");


homeController.get("/", async (req, res) => {
  const housings = await getRecent();

  res.render("home", {
    title: "Home Page",
    housings,
  });
});

// TODO fix search to start with no results
homeController.get("/search", async (req, res) => {
  let housings = [];
  if (req.query.search != ``) {
    housings = await getAll(req.query.search);
  }

  res.render("search", {
    title: "Search Page",
    housings,
    search: req.query.search,
  });
});

module.exports = homeController;
