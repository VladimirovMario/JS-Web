const Post = require("../models/Post");

async function getAll() {
  return Post.find({}).lean();
}

async function createPost(post) {
  return Post.create(post);
}

async function getById(id) {
  return Post.findById(id).lean();
}

async function deleteById(id) {
  return Post.findByIdAndRemove(id);
}

async function updateById(id, body) {
  const edited = await Post.findById(id);
  edited.title = body.title;
  edited.keyword = body.keyword;
  edited.location = body.location;
  edited.createdAt = body.createdAt;
  edited.imageUrl = body.imageUrl;
  edited.description = body.description;
  return edited.save();
}

async function votedUsers(postId, userId, vote) {
  const existing = await Post.findById(postId);
  existing.users.push(userId);
  // console.log(vote);
  vote == "like" ? existing.usersCount++ : existing.usersCount--;
  return existing.save();
}

module.exports = {
  getAll,
  createPost,
  getById,
  deleteById,
  updateById,
  votedUsers,
};
