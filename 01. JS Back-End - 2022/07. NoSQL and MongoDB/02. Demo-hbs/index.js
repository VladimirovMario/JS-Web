const express = require("express");
const hbs = require("express-handlebars").create({
  extname: ".hbs",
});
const mongoose = require("mongoose");
const articleController = require("./controllers/articleController");
const homeController = require("./controllers/homeController");

const connectionString = "mongodb://0.0.0.0:27017/testdb2";

start();

async function start() {
  const app = express();
  app.engine(".hbs", hbs.engine);
  app.set("view engine", ".hbs");

  // Middleware form data parser
  //author=Jane&title=My+second+article.&content=Content+from%3A+Form
  app.use(express.urlencoded({extended: true}))
  app.use("/", homeController);
  app.use("/articles", articleController);

  await mongoose.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  console.log("Database connected");

  const port = 3000;
  app.listen(`${port}`, () => console.log(`App listening on port ${port}`));
}
