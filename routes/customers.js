const router = require("express").Router();

const { Customer, validate } = require("../modules/customer");
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isgold,
  });
  try {
    const result = await customer.save();
    res.send(result);
  } catch (e) {
    res.send(e.message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
      },
      { new: true }
    );
    if (!customer)
      return res.status(404).send(`Customer with the given id was not found`);
    res.send(customer);
  } catch (e) {
    res.send(e.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer)
      return res.status(404).send(`Customer with the given id was not found`);
    res.send(customer);
  } catch (e) {
    res.send(e.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer)
      return res.status(404).send(`Customer with the given id was not found`);
    res.send(customer);
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = router;
