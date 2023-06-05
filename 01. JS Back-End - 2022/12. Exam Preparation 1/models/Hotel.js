const { Schema, model, Types } = require("mongoose");

const URL_PATTERN = /^https?:\/\/.+$/i;

const hotelSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: [4, "The name should be at least 4 characters"],
  },
  city: {
    type: String,
    required: true,
    minlength: [3, "The city should be at least 3 characters long"],
  },
  freeRooms: {
    type: Number,
    required: true,
    min: [1, "Rooms must be between 1 and 100"],
    max: [100, "Rooms must be between 1 and 100"],
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: (value)=> URL_PATTERN.test(value),
      message: 'The imageUrl should starts with http or https'
    }
  },
  bookings: {
    type: [Types.ObjectId],
    ref: "User",
    default: [],
  },
  owner: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
});

hotelSchema.index({ name: 1 }, {
    unique: true,
    collation: {
      locale: "en",
      strength: 2,
    },
  });

const Hotel = model("Hotel", hotelSchema);

module.exports = Hotel;
/**Hotel
 Users Booked a room - a collection of Users
 Owner – string (required)
 */
