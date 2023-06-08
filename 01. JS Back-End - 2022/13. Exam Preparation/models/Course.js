const { Schema, model, Types } = require("mongoose");

const URL_PATTERN = /^https?:\/\/.+$/i;

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    }, 
    description: {
        type: String,
        required: true,
        maxLength: [50 , 'Description max length is 50 symbols']
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: (value)=> URL_PATTERN.test(value),
            message: 'The imageUrl should starts with http or https'
        }
    },
    duration: {
        type: String,
        required: [true, 'Duration is required']
    },
    createdAt: {
        type: String,
        required: true,
        default: ()=> (new Date()).toISOString().slice(0, 10) //"2022-10-27"
    },
    users: {
        type: [Types.ObjectId],
        ref: "User",
        default: [],
    }, 
    usersCount: {
        type: Number,
        default: 0
    },
    owner : {
        type: Types.ObjectId,
        ref: 'User'
    }
});

courseSchema.index({ title: 1 }, {
    unique: true,
    collation: {
      locale: "en",
      strength: 2,
    },
  });

const Course = model("Course", courseSchema);

module.exports = Course;

/**Course
[x] Title - string (required), unique
[x] Description - string (required),  max length of 50 symbols,
[x] Image Url - string (required),
[x] Duration – string (required),
[x] Created at – Date or String, (required),
[x] Users Enrolled - a collection of User,

[x] Added additional field userCount
[x] Added additional field Owner 
 */
