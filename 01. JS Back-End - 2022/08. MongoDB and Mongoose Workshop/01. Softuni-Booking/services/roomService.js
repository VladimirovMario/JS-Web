const Room = require("../models/Room");

function getAll(search, city, fromPrice, toPrice) {
  return Room.find({}).lean();
}

function getById(id) {
  // TODO fix bud
  // After adding .populate('facilities', 'label iconUrl')
  // the check boxes stopped working properly
  return Room.findById(id).populate('facilities', 'label iconUrl').lean();
}

async function create(roomData) {
  const room = {
    name: roomData.name.trim(),
    description: roomData.description.trim(),
    city: roomData.city.trim(),
    beds: Number(roomData.beds),
    price: Number(roomData.price),
    imgUrl: roomData.imgUrl.trim(),
  };

  const missing = Object.entries(room).filter(([k, v]) => !v);
  if (missing.length > 0) {
    console.log(missing.map((m) => `${m[0]} is required!`));
    throw new Error(missing.map((m) => `${m[0]} is required!`).join("\n"));
  }

  const result = await Room.create(room);
  // return room for controller to read the id
  return result;
}

module.exports = {
  getAll,
  getById,
  create,
};
