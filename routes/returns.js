const router = require("express").Router();
router.post("/", async (req, res) => {
  res.status(401).send("Unauthhorized");
});

module.exports = router;
