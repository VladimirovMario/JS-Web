const Game = require("../models/Game");

async function getAll() {
  return Game.find({});
}

async function createGame(game) {
  return Game.create(game);
}

async function getById(id) {
  return Game.findById(id).lean();
}

async function deleteById(id) {
  return Game.findByIdAndRemove(id);
}

async function updateById(id, body) {
  const edited = await Game.findById(id);
  edited.title = body.title;
  edited.description = body.keyword;
  edited.imageUrl = body.imageUrl;
  edited.genre = body.genre;
  edited.price = body.price;
  
  return edited.save();
}


module.exports = {
  getAll,
  createGame,
  getById,
  deleteById,
  updateById,
};
