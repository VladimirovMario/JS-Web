const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
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
[x] First Name - string (required), unique
[x] Last Name - string (required),
[x] Email - string (required),
[x] Password - string (required),
[ ] My Posts - a collection of Post (a reference to the Post Model)
 */
