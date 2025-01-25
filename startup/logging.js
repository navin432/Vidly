const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");
// Winston for logging errors, Winston has transport which is storage device for logs it has console, file, http plugins for logging messages for MongoDB, CouchDB,Redis, Loggly
module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.File({ filename: "uncaughtExceptions.log" }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.prettyPrint()
      ),
    })
  );

  // handling unhandled rejections
  process.on("unhandledRejection", (ex) => {
    winston.error(ex.message, ex);
    process.exit(1);
  });

  winston.add(
    new winston.transports.File({ filename: "logfile.log", level: "info" })
  );
  //level: info stores upto level info including error and warn

  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/vidly",
      level: "error",
    })
  );

  // For logging in console
  winston.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.prettyPrint(),
        winston.format.printf(({ level, message, stack }) => {
          if (message instanceof Error) {
            return `${level}: ${message.stack || message.toString()}`;
          }
          // Otherwise, log normally
          return `${level}: ${message}`;
        })
      ),
    })
  );
};
