const mongoose = require("mongoose");

// TODO change database name according to assignment
const connectionString = "mongodb://0.0.0.0:27017/exam-prep2";

module.exports = async (app) => {
  try {
    await mongoose.connect(connectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.error("Error initializing database");
    console.error(error.message);
    process.exit(1);
  }
};
