const Hotel = require("../models/Hotel");

async function getAll() {
  return await Hotel.find({}).lean().sort({ freeRooms: -1 });
}

async function getById(id) {
  return await Hotel.findById(id).lean();
}

async function create(hotel) {
  // TODO check if there are existing names in database
  return await Hotel.create(hotel);
}

async function update(id, hotel) {
  const existing = await Hotel.findById(id);
  existing.name = hotel.name;
  existing.city = hotel.city;
  existing.freeRooms = hotel.freeRooms;
  existing.imageUrl = hotel.imageUrl;
  await existing.save();
}

async function deleteById(id) {
  await Hotel.findByIdAndRemove(id);
}

async function bookRoom(hotelId, userId) {
  const hotel = await Hotel.findById(hotelId);

  if (hotel.bookings.includes(userId)) {
    throw new Error("Cannot book twice");
  }
  hotel.bookings.push(userId);
  await hotel.save();
}

async function getByUserBooking(userId) {
  return Hotel.find({ bookings: userId }).lean();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
  bookRoom,
  getByUserBooking,
};
