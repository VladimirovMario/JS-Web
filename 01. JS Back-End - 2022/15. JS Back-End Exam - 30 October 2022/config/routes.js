const homeController = require("../controllers/homeController");
const authController = require("../controllers/authController");
const catalogController = require("../controllers/catalogController");
const defaultController = require("../controllers/defaultController");

module.exports = (app) => {
  app.use(homeController);
  app.use("/auth", authController);
  app.use("/catalog", catalogController);
  app.use("*", defaultController);
};
