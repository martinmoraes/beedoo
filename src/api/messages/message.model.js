const mongoose = require('mongoose');
const { Schema } = mongoose;

const message = new Schema({
  message: {
    type: String,
  },
});

const MessageModel = mongoose.model('Message', message);

module.exports = { MessageModel };
