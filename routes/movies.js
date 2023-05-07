const { Movie } = require("../models/movie");
const { User } = require("../models/user");
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

router.put("/addrating/:id", async (req, res) => {
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

// POST route to add a new review to a movie document
router.post("/:id/reviews", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // const user = await User.findById(req.user);
    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }

    movie.reviews.push({
      user: req.body.user,
      review: req.body.review,
      likes: req.body.likes,
      dislikes: req.body.dislikes,
      comments: req.body.comments,
  });
    await movie.save();

    res.status(201).json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

router.get("/search", async (req, res) => {
  const searchTerm = req.query.q;
  const regex = new RegExp(searchTerm, "i");

  const movies = await Movie.find({
    $or: [
      { title: { $regex: regex } },
      { cast: { $regex: regex } },
      { crew: { $regex: regex } },
      { genre: { $regex: regex } },
      { storyline: { $regex: regex } },
      { awards: { $regex: regex } },
    ],
  }).select("-__v");

  res.json(movies);
});

// POST /movies/:id/ratings
router.post('/:id/ratings', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    // Add rating to the movie ratings array
    movie.ratings.push({
      rating: req.body.rating,
      user: req.body.user
    });

    // Calculate the new overall rating
    const totalRatings = movie.ratings.length;
    const totalRatingValue = movie.ratings.reduce((acc, curr) => acc + curr.rating, 0);
    movie.overallRating = totalRatingValue / totalRatings;

    // Save the updated movie document
    await movie.save();

    res.send(movie);
  } catch (ex) {
    res.status(500).send(`Internal Server Error: ${ex}`);
  }
});


router.get("/bygenres", async (req, res) => {
  const movies = await Movie.find().select("-__v").sort("genreId");
  res.send(movies);
});

router.get("/bydate", async (req, res) => {
  const movies = await Movie.find().select("-__v").sort("releaseDate");
  res.send(movies);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const movie = await Movie.findById(req.params.id).select("-__v");

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});



module.exports = router;
