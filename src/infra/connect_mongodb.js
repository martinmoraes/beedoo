const mongoose = require('mongoose');

const connectMongo = async () => {
  const connectionOptions = {
    maxPoolSize: process.env.MONGO_POOLSIZE,
    dbName: process.env.MONGO_DATABASE,
  };
  return mongoose.connect(process.env.MONGO_HOST, connectionOptions);
};

module.exports = { connectMongo };
