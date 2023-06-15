const { Schema, model, Types } = require("mongoose");

const URL_PATTERN = /^https?:\/\/.+$/i;

const dataSchema = new Schema({
  title: { type: String, required: true, },

  imageUrl: { type: String, required: true, validate: {
      validator: (value) => URL_PATTERN.test(value),
      message: "The imageUrl should starts with http or https",},
    },

  content: { type: String, required: true },

  blog: { type: String, required: true,},

  followList: { type: [Types.ObjectId], ref: "User", default: [], },

  owner: { type: Types.ObjectId, ref: "User" },

  createdAt: { type: String,
    default: () => new Date().toISOString().slice(11,19)},
});

const Data = model("Data", dataSchema);

module.exports = Data;

/** Blog
[x] Title - String (required),
[x] Image: String (required),
[x] Content: String (required),
[x] Blog Category: String (required),
[x] FollowList - a collection of Users (a reference to the User model)
[x] Owner - object Id (a reference to the User model)
 */
