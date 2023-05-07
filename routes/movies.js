const { Movie } = require("../models/movie");
const { Genre } = require("../models/genre");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const moment = require("moment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find().select("-__v").sort({ overallRating: -1 });
  res.send(movies);
});

router.post("/", async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    image: req.body.imgUrl,
    description: req.body.description,
    cast: req.body.cast,
    storyline: req.body.storyline,
    runningTime: req.body.runningTime,
    awards: req.body.awards,
    overallRating: req.body.overallRating,
    budget: req.body.budget,
    boxOfficeCollection: req.body.boxOfficeCollection,
    releaseDate: req.body.releaseDate,
    ratings: req.body.ratings,
    reviews: req.body.reviews,
    publishDate: moment().toJSON(),
  });
  await movie.save();

  res.send(movie);
});

router.put("/:id", async (req, res) => {
  // const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      image: req.body.imgUrl,
      description: req.body.description,
      cast: req.body.cast,
      storyline: req.body.storyline,
      runningTime: req.body.runningTime,
      awards: req.body.awards,
      overallRating: req.body.overallRating,
      budget: req.body.budget,
      boxOfficeCollection: req.body.boxOfficeCollection,
      releaseDate: req.body.releaseDate,
      ratings: req.body.ratings,
      reviews: req.body.reviews,
    },
    { new: true }
  );

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const movie = await Movie.findById(req.params.id).select("-__v");

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

module.exports = router;
