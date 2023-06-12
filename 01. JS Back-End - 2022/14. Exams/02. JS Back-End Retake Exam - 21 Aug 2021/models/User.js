const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
});

userSchema.index({ username: 1 }, {
    unique: true,
    collation: {
      locale: "en",
      strength: 2,
    },
});

const User = model("User", userSchema);

module.exports = User;

/**User
[x] Name - string (required),
[x] Username - string (required),
[x] Password - string (required)
 */


