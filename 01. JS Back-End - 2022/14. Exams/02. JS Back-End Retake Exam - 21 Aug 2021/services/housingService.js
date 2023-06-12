const Housing = require("../models/Housing");

async function getRecent() {
  // TODO sort by date created
  return Housing.find({}).sort({}).limit(3).lean();
}

async function getAll(search) {
  const query = {};
  if (search) {
    query.type = new RegExp(search, "i");
  }
  return Housing.find(query).sort({ createdAt: 1 }).lean();
}

async function createPost(post) {
  return Housing.create(post);
}

async function getById(id) {
  return Housing.findById(id).lean();
}

async function deleteById(id) {
  return Housing.findByIdAndRemove(id);
}

async function updateById(id, body) {
  const edited = await Housing.findById(id);

  edited.name = body.name;
  edited.type = body.type;
  edited.year = Number(body.year);
  edited.city = body.city;
  edited.imageUrl = body.imageUrl;
  edited.description = body.description;
  edited.availablePieces = Number(body.availablePieces);
  return edited.save();
}

async function rented(postId, userId) {
  const existing = await Housing.findById(postId);
  existing.rented.push(userId);
  existing.availablePieces--;
  return existing.save();
}


module.exports = {
  getRecent,
  getAll,
  createPost,
  getById,
  deleteById,
  updateById,
  rented,
};
