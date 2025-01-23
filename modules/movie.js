const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genre");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 254,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 254,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 254,
  },
});

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(4).max(254).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  });
  return schema.validate(movie);
}

const Movie = mongoose.model("Movie", movieSchema);

exports.Movie = Movie;
exports.validate = validateMovie;
