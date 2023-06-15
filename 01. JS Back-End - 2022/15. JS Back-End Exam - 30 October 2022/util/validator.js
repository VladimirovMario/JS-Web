const validator = require("validator");

function registerValidations(body) {
  if (Object.values(body).some((v) => !v)) {
    throw new Error("All fields are required!");
  }
  if (body.username.length < 2) {
    throw new Error("The username should be at least 2 characters long!");
  }
  if (body.email.length < 10) {
    throw new Error("The email should be at least 10 characters long!");
  }
  if (body.password.length < 4) {
    throw new Error("The password should be at least 4 characters long");
  }
  if (body.password != body.repass) {
    throw new Error("Passwords don't match!");
  }
}

function loginValidations(body) {
  if (Object.values(body).some((v) => !v)) {
    throw new Error("All fields are required!");
  }
}

function submitValidations(body) {
  if (Object.values(body).some((v) => !v)) {
    throw new Error("All fields are required!");
  }
  if (body.title.length < 5) {
    throw new Error("Title should be at least 5 characters!");
  }
  if (body.title.length > 50) {
    throw new Error("Title should be no longer than 50 characters!");
  }
  if (body.content.length < 10) {
    throw new Error("Content should be a minimum of 10 characters long!");
  }
  if (body.blog.length < 3) {
    throw new Error("Category should be a minimum of 3 characters long!");
  }
}

module.exports = {
  registerValidations,
  loginValidations,
  submitValidations,
};
