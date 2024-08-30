const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true
  },
  locality: {
    type: [String],
    required: true
  },
  properties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  }]
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
