require('dotenv').config();

const { connectMongo } = require('./infra/connect_mongodb');
// const { init } = require('./express');
const { logger } = require('./infra/logger');

(async () => {
  try {
    await connectMongo();

    // init();
  } catch (error) {
    logger.error(error);
  }
})();
