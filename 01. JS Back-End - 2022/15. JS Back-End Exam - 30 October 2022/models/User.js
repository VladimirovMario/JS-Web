const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {type: String, required: true,},
  
  email: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
});

userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
      locale: "en",
      strength: 2,
    },
});

const User = model("User", userSchema);

module.exports = User;

/**User
Username - string (required),
Email - string (required),
Password - string (required)
 */

