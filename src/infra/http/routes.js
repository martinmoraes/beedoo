const { registerRoutes: messageRegisterRoutes } = require('../../api/messages/message.controller');

const setupRoutes = (app) => {
  messageRegisterRoutes(app);
};

module.exports = { setupRoutes };
