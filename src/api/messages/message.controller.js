const { CreateMessageService } = require('./create_message.service');
const { ListMessageService } = require('./list_message.service');
const { MessageRepository } = require('./message.repository');
const { HttpResponse } = require('../../infra/http/HttpResponse');

const registerRoutes = (app) => {
  app.post('/message', async (req, resp) => {
    const body = req.body;
    const createMessageService = new CreateMessageService(new HttpResponse(resp), new MessageRepository());
    createMessageService.execute(body);
  });

  app.get('/message', async (req, resp) => {
    const query = req.query;
    const listMessageService = new ListMessageService(new HttpResponse(resp), new MessageRepository());
    listMessageService.execute(query);
  });
};

module.exports = { registerRoutes };
