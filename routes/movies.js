const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const { Genre } = require("../modules/genre");
const { Movie, validate } = require("../modules/movie");
// Get Request
router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie)
      return res.status(404).send(`The movie with the given id was not found`);
    res.send(movie);
  } catch (e) {
    res.send(e.message);
  }
});

// Post Request
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");
  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  try {
    const result = await movie.save();
    res.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

// Put Request
router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    );
    if (!movie)
      return res.status(404).send(`The movie with the given id was not found`);
    res.send(movie);
  } catch (e) {
    res.send(e.message);
  }
});

// Delete Request
router.delete("/:id", auth, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie)
      return res.status(404).send(`The movie with the given id was not found`);
    res.send(movie);
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = router;
