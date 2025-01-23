const winston = require("winston");
module.exports = function (err, req, res, next) {
  winston.error(err.message);

  // winston.log("error", err.message, err);
  // Third argument stores meta data, i.e. every property in error object in log
  // logging Level determines the importance of message that we are going to log
  // error
  // warn
  // info
  // verbose
  // debug
  // silly

  res.status(500).send("Something failed");
};
