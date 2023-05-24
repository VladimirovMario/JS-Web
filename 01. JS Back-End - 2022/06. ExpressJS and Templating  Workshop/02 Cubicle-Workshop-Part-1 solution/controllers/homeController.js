const router = require("express").Router();
const { getAll } = require("../services/cubesServices");

router.get("/", (req, res) => {
  const search = req.query.search || "";
  const fromDifficulty = Number(req.query.from);
  const toDifficulty = Number(req.query.to);

  const cubes = getAll(search, fromDifficulty, toDifficulty);

  res.render("home", {
    title: "Browse Cubes",
    cubes,
    search,
    fromDifficulty,
    toDifficulty
  });
});

module.exports = router;
