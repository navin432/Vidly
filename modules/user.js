const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    minlength: 6,
    maxlength: 254,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, name: this.name, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
};

const User = mongoose.model("User", userSchema);
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    email: Joi.string().min(6).max(254).required().email(),
    password: Joi.string().min(6).max(254).required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
