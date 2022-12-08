const { Schema, model, Types } = require("mongoose");

const URL_PATTERN = /^https?:\/\/.+$/i;

const gameSchema = new Schema(
  {
    title: { type: String, required: true , minlength: [3, 'Title must be at least 3 characters long']},
    description: { type: String, required: true , minlength: [4, 'Description should be a minimum of 4 characters long!']},
    imageUrl: { type: String, required: true,
        validate: {
        validator: (value) => URL_PATTERN.test(value),
        message: "The imageUrl should starts with http or https",
      },
    },
    genre: { type: String, required: true , minlength: [3, 'Description should be a minimum of 3 characters long!']},
    price: { type: String, required: true, type: Number, required: true, min: [0.01, 'Price must be a positive number']},   
    owner: { type: Types.ObjectId, ref: "User" },
    users: { type: [Types.ObjectId], ref: "User", default: [] },
    usersCount: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: "created_at" } }
);

const Game = model("Game", gameSchema);

module.exports = Game;

/**Game
[x] Title - string (required),
[x] Keyword - string (required),
[x] Location - string (required),
[x] Date of creation - string (required),
[x] Image - string (required),
[x] Description - string (required),
[x] Author - object Id (a reference to the User model),
[x] Votes on post - a collection of Users (a reference to the User model),
[x] Rating of post - number, default value 0
 */
