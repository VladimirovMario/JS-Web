const router = require("express").Router();
const { getById } = require("../services/cubesServices");


router.get("/:id", (req, res) => {
  const id = req.params.id;
  const cube = getById(id);

  if (cube) {
    res.render("details", {
      title: `${cube.name} Details`,
      cube,
    });
  } else {
    res.render("cubeNotFound", {
      title: "Details",
      id,
    });
  }
});

module.exports = router;
