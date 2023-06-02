const { create } = require("../services/roomService");

const createController = require("express").Router();

createController.get("/", (req, res) => {
  res.render("create", {
    title: "Host New Accommodation",
  });
});

createController.post("/", async (req, res) => {
  console.log('>>> From createController.post: req.body >>>' ,req.body);

  try {
    const result = await create(req.body, req.user._id);
    res.redirect("/catalog/" + result._id);
  } catch (error) {

    res.render("create", {
      title: "Request Error",
      error: error.message.split('\n'),
    });
  }
});

module.exports = createController;
