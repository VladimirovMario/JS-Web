const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  author: String,
  content: { type: String, required: true, minLength: 10 },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
