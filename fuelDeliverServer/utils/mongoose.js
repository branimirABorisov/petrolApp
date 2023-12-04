const mongoose = require("mongoose");

async function mongooseConnect() {
  const uri = process.env.MONGODB_URI;

  if (mongoose.connection.readyState === 1) {
    console.log('Already connected to MongoDB');
    return Promise.resolve();
  } else {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw error;
    }
  }
}


module.exports = mongooseConnect;
