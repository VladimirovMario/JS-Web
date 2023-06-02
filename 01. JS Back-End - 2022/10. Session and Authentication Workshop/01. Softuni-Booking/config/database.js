const mongoose = require("mongoose");

const connectionString = "mongodb://0.0.0.0:27017/exam-prep";

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
    // The shell that executed Node.js should see the exit code as 1.
    // Calling process.exit() will force the process to exit as quickly as possible
    // even if there are still asynchronous operations pending that have not yet completed fully
    process.exit(1);
  }
};
