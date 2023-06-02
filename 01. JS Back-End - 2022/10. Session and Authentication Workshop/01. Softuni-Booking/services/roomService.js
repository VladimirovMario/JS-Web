const Room = require("../models/Room");

function getAll(search, city, fromPrice, toPrice) {
  return Room.find({}).lean();
}

function getById(id) {
  // TODO fix bud
  // After adding .populate('facilities', 'label iconUrl')
  // the check boxes stopped working properly
  return Room.findById(id).populate("facilities", "label iconUrl").lean();
}

async function create(roomData, ownerId) {
  const room = {
    name: roomData.name.trim(),
    description: roomData.description.trim(),
    city: roomData.city.trim(),
    beds: Number(roomData.beds),
    price: Number(roomData.price),
    imgUrl: roomData.imgUrl.trim(),
    owner: ownerId,
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

async function update(roomId, roomData) {
  const missing = Object.entries(roomData).filter(([k, v]) => !v);
  if (missing.length > 0) {
    console.log(missing.map((m) => `${m[0]} is required!`));
    throw new Error(missing.map((m) => `${m[0]} is required!`).join("\n"));
  }

  const room = await Room.findById(roomId);

  room.name = roomData.name.trim();
  room.description = roomData.description.trim();
  room.city = roomData.city.trim();
  room.beds = Number(roomData.beds);
  room.price = Number(roomData.price);
  room.imgUrl = roomData.imgUrl.trim();

  await room.save();
  return room;
}

async function deleteById(roomId) {
  return Room.findByIdAndRemove(roomId);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
