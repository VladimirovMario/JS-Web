const Article = require("../models/Article");

async function getAllArticles() {
  return await Article.find({}).lean();
}

async function createArticle(author, title, content) {
  await Article.create({
    author,
    title,
    content,
  });
}

module.exports = {
  getAllArticles,
  createArticle,
};
