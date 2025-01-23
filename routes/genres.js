const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");

const express = require("express");
const router = express.Router();
const { Genre, validate } = require("../modules/genre");

// Get Request
router.get("/", async (req, res, next) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send(`The genre with the given id was not found`);
  res.send(genre);
});

// Post Request
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = new Genre({
    name: req.body.name,
  });
  try {
    const result = await genre.save();
    res.send(result);
  } catch (e) {
    console.log(e.message);
  }
});

// Put Request
router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!genre)
      return res.status(404).send(`The genre with the given id was not found`);
    res.send(genre);
  
});

// Delete Request
router.delete("/:id", [auth, admin], async (req, res) => {
  try {
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if (!genre)
      return res.status(404).send(`The genre with the given id was not found`);
    res.send(genre);
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = router;
