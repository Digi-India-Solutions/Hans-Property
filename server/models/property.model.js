const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Rent', 'Buy'],
    required: true
  },
  category: {
    type: String,
    enum: ['Buy', 'Rent', 'Commercial', 'PG', 'Plots'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  areaSize: {
    type: String,
    required: true
  },
  bedrooms: {
    type: Number
  },
  bathrooms: {
    type: Number
  },
  yearBuilt: {
    type: Number
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  },
  state: {
    type: String
  },
  locality: {
    type: String
  },
  mapLink: {
    type: String
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  images: [
    {
      type:String,
      required:[true,"Image is must required"]
    }
  ]
}, { timestamps: true });

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;