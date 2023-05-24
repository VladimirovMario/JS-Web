const { create } = require("../services/cubesServices");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("create", {
    title: "Create Cube",
  });
});

router.post("/", async (req, res) => {

  try {
    const result = await create(req.body);
    
    res.redirect(`/details/${result.id}`);
  } catch (error) {
    console.log('/details/',req.body);
    res.render("create", {
      title: "Request Error",
      error: error.message.split("\n"),
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
    });
  }
});

module.exports = router;
