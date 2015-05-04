'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Article Schema
 */
var MediaSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  imageName: {
    type: String,
    required: true,
    trim: true
  },
  mimeType: {
    type: String,
    required: true,
    trim: true
  }
});

/**
 * Validations
 */
MediaSchema.path('name').validate(function(name) {
  return !!name;
}, 'Name cannot be blank');

MediaSchema.path('description').validate(function(description) {
  return !!description;
}, 'Description cannot be blank');

MediaSchema.path('imageName').validate(function(imageName) {
  return !!imageName;
}, 'Image cannot be blank');

MediaSchema.path('mimeType').validate(function(mimeType) {
  return !!mimeType;
}, 'Image Type cannot be blank');

/**
 * Statics
 */
MediaSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

mongoose.model('Media', MediaSchema);
