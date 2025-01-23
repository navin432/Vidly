const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Navin");
});
module.exports = router;
