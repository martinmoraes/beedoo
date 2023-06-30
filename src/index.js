require('dotenv').config();

const { connectMongo } = require('./infra/connect_mongodb');
const { init } = require('./infra/http/express');
const { logger } = require('./infra/logger');

(async () => {
  try {
    logger.info('Starting the application');

    await connectMongo();
    logger.info('MongoDb started');

    init();
    logger.info('HTTP server started');
  } catch (error) {
    logger.error(error);
  }
})();
