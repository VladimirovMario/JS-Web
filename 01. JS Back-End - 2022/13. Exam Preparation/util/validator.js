const validator = require("validator");

function registerValidations(body) {
  if (body.username == "" || body.password == "") {
    throw new Error("All fields are required!");
  }
  if (validator.isAlphanumeric(body.username) == false) {
    throw new Error("Username should consist only english letters and digits!");
  }
  if (validator.isAlphanumeric(body.password) == false) {
    throw new Error("Password should consist only english letters and digits!");
  }
  if (body.password.length < 5) {
    throw new Error("The password should be at least 5 characters long");
  }
  if (body.password != body.rePassword) {
    throw new Error("Passwords don't match!");
  }
}

function loginValidations(body) {
  if (body.username == "" || body.password == "") {
    throw new Error("All fields are required!");
  }
}

function submitValidations(body) {
  console.log('>>> From createValidations body>>>', body);
  
  if (Object.values(body).some((v) => !v)) {
    throw new Error("All fields are required!");
  }
  if (body.title.length < 4) {
    throw new Error("The title should be at least 4 characters!");
  }
  if (body.description.length < 20) {
    throw new Error("The description should be at least 20 characters long!");
  }
}

module.exports = {
  registerValidations,
  loginValidations,
  submitValidations,
};
