const { getList, getById } = require("../services/productService");

const router = require("express").Router();

router.get("/", (req, res) => {
  const products = getList();

  console.log(">>>");
  console.log(req.originalUrl, products);
  console.log(">>>");

  res.render("catalog", {
    title: "Catalog Page",
    products,
  });
});

router.get("/:productId", (req, res) => {
  const id = req.params.productId;
  const product = getById(id);

  console.log(">>>");
  console.log("/:productId", req.originalUrl);
  console.log(`CATALOG CONTROLLER`, "id:", id, "product:", product);
  console.log(">>>");

  if (product) {
    res.render("details", product);
  } else {
    res.render("missingProduct", {
      id,
    });
  }
});

module.exports = router;
