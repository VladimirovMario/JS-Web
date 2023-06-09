const { Schema, model, Types } = require("mongoose");

const URL_PATTERN = /^https?:\/\/.+$/i;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  keyword: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
    default: () => new Date().toISOString().slice(0, 10), //"2022-10-27"
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: (value) => URL_PATTERN.test(value),
      message: "The imageUrl should starts with http or https",
    },
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: Types.ObjectId,
    ref: "User",
  },
  users: {
    type: [Types.ObjectId],
    ref: "User",
    default: [],
  },
  usersCount: {
    type: Number,
    default: 0,
  },
  
});

const Post = model("Post", postSchema);

module.exports = Post;

/**Post
[x] Title - string (required),
[x] Keyword - string (required),
[x] Location - string (required),
[x] Date of creation - string (required),
[x] Image - string (required),
[x] Description - string (required),
[x] Author - object Id (a reference to the User model),
[x] Votes on post - a collection of Users (a reference to the User model),
[x] Rating of post - number, default value 0
 */
