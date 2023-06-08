const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "The username should be at least 5 characters long"],
  },
  hashedPassword: {
     type: String,
     required: true 
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
[x] Username - string (required), unique
[x] Password - string (required)
[ ] Enrolled Courses - a collection of Courses 
 */
