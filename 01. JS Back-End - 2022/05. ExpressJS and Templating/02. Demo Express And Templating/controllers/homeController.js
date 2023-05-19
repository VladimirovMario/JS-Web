const router = require("express").Router();


router.get("/", (req, res) => {

  console.log(req.originalUrl);
  
  res.render("home", {
    title: 'Express and Handlebars Demo'
  });
});

router.get("/about", (req, res) => {
    res.render("about", {
    title: 'About Page'
  });
});

module.exports = router;
