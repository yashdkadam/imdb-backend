const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require("./genre");

const commentSchema = new mongoose.Schema({
  type: mongoose.Schema.Types.Mixed,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: String,
    maxlength: 3000,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const reviewSchema = new mongoose.Schema({
  type: mongoose.Schema.Types.Mixed,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  review: {
    type: String,
    maxlength: 3000,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [commentSchema],
});

const ratingSchema = new mongoose.Schema({
  type: mongoose.Schema.Types.Mixed,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    maxlength: 3000,
  },
});

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  overallRating:{
    type: Number,
    required: true,
  },
  cast: [
    {
      type: String,
    },
  ],
  crew: [
    {
      type: String,
    },
  ],
  genreId: {
    type: genreSchema,
  },
  storyline: {
    type: String,
    required: true,
  },
  runningTime: {
    type: Number,
    required: true,
  },
  awards: {
    type: String,
  },
  budget: {
    type: Number,
  },
  boxOfficeCollection: {
    type: Number,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  ratings: {
    type: mongoose.Schema.Types.Mixed
  },
  reviews:{
    type: mongoose.Schema.Types.Mixed,
  }
});

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// const User = mongoose.model("User", userSchema);
const Movie = mongoose.model("Movie", movieSchema);




// function validateMovie(movie) {
//   const schema = {
//     title: Joi.string().min(5).max(50).required(),
//     genreId: Joi.objectId().required(),
//     imgUrl: Joi.string(),
//     description: Joi.string(),
//     cast: Joi.string(),
//     storyline: Joi.string(),
//     length: Joi.number(),
//     awards: Joi.string(),
//     budget: Joi.number(),
//     box_collection: Joi.number(),
//     release_date: Joi.date(),
//   };
  
//   return Joi.validate(movie, schema);
// }

// exports.validate = validateMovie;
module.exports = {
  Movie,
};
