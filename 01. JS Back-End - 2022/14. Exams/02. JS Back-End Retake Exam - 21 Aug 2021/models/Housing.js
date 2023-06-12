const { Schema, model, Types } = require("mongoose");

const URL_PATTERN = /^https?:\/\/.+$/i;

const housingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: (value) => URL_PATTERN.test(value),
      message: "The imageUrl should starts with http or https",
    },
  },
  description: {
    type: String,
    required: true,
  },
  availablePieces: {
    type: Number,
    default: 0,
  },
  rented: {
    type: [Types.ObjectId],
    ref: "User",
    default: [],
  },
  owner: {
    type: Types.ObjectId,
    ref: "User",
  },
});

const Housing = model("Housing", housingSchema);

module.exports = Housing;
/** Housing
[x] Name - string (required),
[x] Type - string (“Apartment”, “Villa”, “House”) required,
[x] Year - number (required),
[x] City – string (required),
[x] Home Image - string (required),
[x] Property Description - string (required),
[x] Available pieces - number(required)
[x] Rented a home - a collection of Users (reference to the User model)
[x] Owner - object Id (reference to the User model)
 */
