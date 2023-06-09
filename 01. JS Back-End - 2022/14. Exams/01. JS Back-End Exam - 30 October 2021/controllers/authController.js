const authController = require("express").Router();
const { register, login } = require("../services/userService");
const { registerValidations, loginValidations } = require("../util/validator");
const { parseError } = require("../util/parser");
// const { isGuest } = require("../middlewares/guards");


authController.get("/register", (req, res) => {
  res.render("register", {
    title: "Register Page",
  });
});

authController.post("/register", async (req, res) => {
  try {
    registerValidations(req.body);
    const token = await register(req.body.username, req.body.lastName, req.body.email, req.body.password);
    res.cookie("token", token);

    res.redirect("/");
  } catch (error) {
    const errors = parseError(error);
    console.log(errors);
      res.render("register", {
      title: "Registration Failed",
      errors,
      body: {
        username: req.body.username,
        lastName: req.body.lastName,
        email: req.body.email
      },
    });
  }
});

authController.get("/login", (req, res) => {
  res.render("login", {
    title: "Login Page",
  });
});

authController.post("/login", async (req, res) => {
  try {
    loginValidations(req.body);
    const token = await login(req.body.email, req.body.password);
    res.cookie("token", token);

    res.redirect("/");
  } catch (error) {
    const errors = parseError(error);
   console.log(errors);
    res.render("login", {
      title: "Login Failed",
      errors,
      body: {
        username: req.body.email,
      },
    });
  }
});

authController.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = authController;
