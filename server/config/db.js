const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://sriram8794134_db_user:SrIrAm224466@ac-8tedfrd-shard-00-00.ex7fdun.mongodb.net:27017,ac-8tedfrd-shard-00-01.ex7fdun.mongodb.net:27017,ac-8tedfrd-shard-00-02.ex7fdun.mongodb.net:27017/hall_db?ssl=true&replicaSet=atlas-jpwsff-shard-0&authSource=admin&retryWrites=true&w=majority');
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`✗ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
