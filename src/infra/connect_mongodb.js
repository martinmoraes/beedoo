const mongoose = require('mongoose');

const connectMongo = async () => {
  const connectionOptions = {
    maxPoolSize: process.env.MONGO_POOLSIZE || 5,
    dbName: process.env.MONGO_DATABASE,
  };
  return mongoose.connect(process.env.MONGO_HOST, connectionOptions);
};

module.exports = { connectMongo };
