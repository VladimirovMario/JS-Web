const { Schema, model } = require("mongoose");

// TODO check the requirements
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // username: { type: String, required: true , unique: true, minlength: [3, 'Username must be at least 3 characters long']},
  username: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9]+$/i,
      "Username should consist english letters and digits",
    ],
  },
  hashedPassword: {
    type: String,
    required: true,
  },
});

userSchema.index(
  { email: 1 },
  {
    unique: true,
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

userSchema.index(
  { username: 1 },
  {
    unique: true,
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

const User = model("User", userSchema);

module.exports = User;
/*
Booked hotels - a collection of Hotels the user have booked already,
Offered Hotels – a collection of Hotels the user offers
*/
