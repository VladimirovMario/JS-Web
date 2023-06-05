const validator = require('validator')
const { register, login } = require("../services/userService");
const { parseError } = require("../util/parser");

const authController = require("express").Router();

authController.get("/register", (req, res) => {
  res.render("register", {
    title: "Register Page",
  });
});

authController.post("/register", async (req, res) => {

  try {
    // TODO check the names of fields and the requirements 
    // validator.default.isAlphanumeric After that we remove default
    if (validator.isEmail(req.body.email) == false) {
      throw new Error("The email should be valid!");
    }
    if (req.body.password.length < 5) {
      throw new Error("The password should be at least 5!");
    }
    if (req.body.email == "" || req.body.username == "" || req.body.password == "") {
      throw new Error("All fields are required!");
    }
    if (req.body.password != req.body.rePassword) {
      throw new Error("Passwords don't match!");
    }

    const token = await register(req.body.email, req.body.username, req.body.password);
    // TODO check assignment to see if register creates session
    res.cookie("token", token);

    console.log(">>> From authController.post(/register token >>>", token);
    

    // TODO check where to redirect
    res.redirect("/");
  } catch (error) {
    const errors = parseError(error);
    // console.log('>>> From register error >>>', error);
    // console.log('>>> error.message >>>', error.message);
    console.log('>>> From register errors >>>', errors);

    // TODO add error display to actual template
    res.render("register", {
      title: "Registration failed",
      errors,
      body: {
        email: req.body.email,
        username: req.body.username,
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
    if (req.body.email == "" || req.body.password == "") {
      throw new Error("All fields are required!");
    }
    const token = await login(req.body.email, req.body.password);
    //in workshop  res.cookie('token', token) was  res.cookie('jwt', token)
    res.cookie("token", token);

    // TODO check where to redirect
    res.redirect("/");
  } catch (error) {
    const errors = parseError(error);

    res.render("login", {
      title: "Login failed",
      errors,
      body: {
        email: req.body.email,
       },
    });
  }
});

authController.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = authController;
