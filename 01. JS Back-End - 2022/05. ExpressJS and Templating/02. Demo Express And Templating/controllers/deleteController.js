const { getById, deleteById } = require("../services/productService");

const router = require("express").Router();

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const product = getById(id);

  console.log('>>>');
  console.log(`DELETE CONTROLLER`, product);
  console.log('>>>');

  res.render("delete", product);
});

router.post("/:id", async (req, res) => {
  const id = req.params.id;

  await deleteById(id);

  res.redirect("/catalog");
});

module.exports = router;
