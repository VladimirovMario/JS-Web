const { create } = require("../services/productService");

const router = require("express").Router();

router.get("/", (req, res) => {
  
  console.log(req.originalUrl);

  res.render("create");
});

router.post("/", async (req, res, next) => {

  console.log('>>> Handling POST');
  console.log(`CREATE CONTROLLER`,"req.body:", req.body);
  console.log('>>>');

  try {
    await create(req.body.name, Number(req.body.price));
  } catch (error) {
    next(error)
  }

  res.redirect("/catalog");
});

module.exports = router;
