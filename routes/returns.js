const { Rental } = require("../modules/rental");

const auth = require("../middleware/auth");
const router = require("express").Router();
router.post("/", auth, async (req, res) => {
  if (!req.body.customerId)
    return res.status(400).send("customerId not provided");

  if (!req.body.movieId) return res.status(400).send("movieId not provided");

  const rental = await Rental.findOne({
    "customer._id": req.body.customerId,
    "movie._id": req.body.movieId,
  });

  if (!rental) return res.status(404).send("no rental found");

  if (rental.dateReturned)
    return res.status(400).send("Return already processed");

  return res.status(200).send();
});

module.exports = router;
