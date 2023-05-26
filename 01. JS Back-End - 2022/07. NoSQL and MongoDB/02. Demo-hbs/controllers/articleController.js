const articleController = require("express").Router();
const { getAllArticles, createArticle } = require("../services/articleService");

articleController.get("/", async (req, res) => {
  const articles = await getAllArticles();
  console.log("From articleController.get:", articles);

  res.render("articles", {
    title: "Articles of the day",
    articles,
  });
});

articleController.post("/", async (req, res) => {
  console.log("From articleController.post:", req.body);

  await createArticle(req.body.author.trim(), req.body.title.trim(), req.body.content.trim());

  res.redirect("/articles");
});

module.exports = articleController;
