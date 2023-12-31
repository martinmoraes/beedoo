const express = require('express');

const { setupRoutes } = require('./routes');
const bodyParser = require('body-parser');
const { logger } = require('../logger');
require('dotenv').config();

const init = () => {
  const app = express();
  const port = process.env.APP_PORT || 3001;

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  setupRoutes(app);

  app.listen(port, () => {
    logger.info(`Express started on port ${port}`);
  });
};

module.exports = { init };
