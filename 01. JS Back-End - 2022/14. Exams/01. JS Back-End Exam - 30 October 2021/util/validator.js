const validator = require("validator");

function registerValidations(body) {  

  if (Object.values(body).some((v) => !v)) {
    throw new Error("All fields are required!");
  }
  if (body.username.length < 3) {
    throw new Error('The first name should be at least 3 characters long!')
  }
  if (validator.isAlphanumeric(body.username) == false) {
    throw new Error("The first name should contains only English letters!");
  }
  if (body.lastName.length < 5) {
    throw new Error("The last name should be at least 5 characters long!");
  }
  if (validator.isAlphanumeric(body.lastName) == false) {
    throw new Error("The last name should contains only English letters!");
  }
  if (validator.isEmail(body.email) == false) {
    throw new Error("Invalid email address!");
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
    console.log(body.location.length);
  if (Object.values(body).some((v) => !v)) {
    throw new Error("All fields are required!");
  }
  if (body.title.length < 6 || body.keyword.length < 6) {
    throw new Error("Title and Keyword should be at least 6 characters (each)!");
  }
  if (body.location.length > 15) {
    throw new Error("Location should be a maximum of 15 characters long!");
  }
  if (body.description.length < 8) {
    throw new Error("Description should be a minimum of 8 characters long!");
  }
  if (body.createdAt.length != 10) {
    throw new Error("Date should be exactly 10 characters!");
  }

}

module.exports = {
  registerValidations,
  loginValidations,
  submitValidations,
};
