const Data = require("../models/Data");
const User = require("../models/User");

async function getAll() {
  return Data.find({}).lean();
}

async function lastAdded() {
  // TODO sort by last created
  return Data.find({}).sort({ createdAt: -1 }).limit(3).lean();
}

async function createPost(post) {
  return Data.create(post);
}

async function getById(id) {
  return Data.findById(id).lean();
}

async function getOwnerById(ownerId) {
  return User.findById(ownerId).populate('email').lean();
}

async function deleteById(id) {
  return Data.findByIdAndRemove(id);
}

async function updateById(id, body) {
  const edited = await Data.findById(id);
  edited.title = body.title;
  edited.imageUrl = body.imageUrl;
  edited.content = body.content;
  edited.blog = body.blog;

  return edited.save();
}

async function followed(postId, userId) {
  const existing = await Data.findById(postId);
  existing.followList.push(userId);
  
  return existing.save();
}

module.exports = {
  lastAdded,
  getAll,
  createPost,
  getById,
  getOwnerById,
  deleteById,
  updateById,
  followed,
};
