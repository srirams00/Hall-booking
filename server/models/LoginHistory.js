const mongoose = require('mongoose');

const LoginHistorySchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  timestamp: { type: String, default: () => new Date().toLocaleString() }
});

module.exports = mongoose.model('LoginHistory', LoginHistorySchema);
