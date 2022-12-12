const Game = require("../models/Game");

async function getAll() {
  return Game.find({});
}

async function createGame(game) {
  return Game.create(game);
}

async function getById(id) {
  return Game.findById(id);
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

async function getLatestsGames(limit) {
  return Game.find().sort({ created_at: -1 }).limit(limit);
}


async function likeGame(gameId, userId) {
  const game = await Game.findById(gameId);

  if (game.users.includes(userId)) {
    console.log("Cannot book twice");
    throw new Error("Cannot like twice");
  }
  game.users.push(userId);
  await game.save();
}

module.exports = {
  getAll,
  createGame,
  getById,
  deleteById,
  updateById,
  getLatestsGames,
  likeGame
};
