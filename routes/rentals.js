const express = require("express");
const router = express.Router();
const { Rental, validate } = require("../modules/rental");
const { Movie } = require("../modules/movie");
const { Customer } = require("../modules/customer");

// Get Request
router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.get("/:id", async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental)
      return res.status(404).send(`The rental with the given id was not found`);
    res.send(rental);
  } catch (e) {
    res.status(500).send("Error fetching rental: " + e.message);
  }
});

// Post Request
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");
  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock");
  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
      isGold: customer.isGold,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  // const session = await mongoose.startSession();
  // session.startTransaction();

  try {
    const result = await rental.save();
    // await rental.save({ session });
    movie.numberInStock--;
    await movie.save();
    // await movie.save({ session });
    // await session.commitTransaction();
    res.send(result);
  } catch (e) {
    // await session.abortTransaction();
    res.status(500).send("Something Failed: " + e.message);
    // } finally {
    //   session.endSession();
  }
});

module.exports = router;
