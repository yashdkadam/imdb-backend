const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');

const Movie = mongoose.model(
  "Movies",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    imgUrl: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 2550,
    },
    cast: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    storyline: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 2550,
    },
    awards: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 2550,
    },
    length: {
      type: Number,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    box_collection: {
      type: Number,
      required: true,
    },
    release_date:{
      type: Date,
      required: true,
    }
  })
);

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.objectId().required(),
    imgUrl: Joi.string(),
    description: Joi.string(),
    cast: Joi.string(),
    storyline: Joi.string(),
    length: Joi.number(),
    awards: Joi.string(),
    budget: Joi.number(),
    box_collection: Joi.number(),
    release_date: Joi.date()
  };

  return Joi.validate(movie, schema);
}

exports.Movie = Movie; 
exports.validate = validateMovie;