const mongoose = require('mongoose');

const connectionString =
  process.env.CONNECTION_STRING || 'mongodb://0.0.0.0:27017/wildlife';

module.exports = async (app) => {
  try {
    await mongoose.connect(connectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('✅ Database connected');
  } catch (error) {
    console.error('❌ Error initializing database');
    console.error(error.message);
    process.exit(1);
  }
};
