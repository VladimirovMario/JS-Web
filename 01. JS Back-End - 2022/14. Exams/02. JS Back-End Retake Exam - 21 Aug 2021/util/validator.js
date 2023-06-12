const validator = require("validator");

function registerValidations(body) {
  const validName = body.name.split(" ");

  if (Object.values(body).some((v) => !v)) {
    throw new Error("All fields are required!");
  }
  if (validName.length != 2) {
    throw new Error(
      "The name should be in the following format: Alexander Peterson!"
    );
  }
  if (body.username.length < 5) {
    throw new Error("The first name should be at least 5 characters long!");
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
  if (body.name.length < 6) {
    throw new Error("Name should be at least 6 characters!");
  }
  if (body.year < 1850 || body.year > 2021) {
    throw new Error("Year should be between 1850 and 2021!");
  }
  if (body.city.length < 4) {
    throw new Error("City should be at least 4 characters long!");
  }
  if (body.description.length > 60) {
    throw new Error("Description should be a maximum of 60 characters long!");
  }
  if (body.availablePieces < 1 || body.availablePieces > 10) {
    throw new Error(
      "Available Pieces should be positive number (from 0 to 10)!"
    );
  }
}

module.exports = {
  registerValidations,
  loginValidations,
  submitValidations,
};
