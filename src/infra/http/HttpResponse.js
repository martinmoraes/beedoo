class HttpResponse {
  constructor(response) {
    this.response = response;
  }

  ok(message) {
    return this.response.status(200).send({ message });
  }

  internalError(message) {
    return this.response.status(500).send({ message });
  }

  notFound(payload) {
    return this.response.status(404).send(payload);
  }

  invalidFormat(errors) {
    return this.response.status(403).send({ validationErrors: errors });
  }
}

module.exports = { HttpResponse };
