const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.send("Catalog page");
});

router.get("/:productId", (req, res) => {
  console.log(req.params);
  res.send("Product details");
});

router.get("/:category/:id", (req, res) => {
  console.log(req.params);
  // { category: 'spareParts', id: '123' }
  res.send("Nested params");
});

module.exports = router