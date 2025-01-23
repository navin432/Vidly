const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 30,
    },
    phone: {
      type: String,
      minlength: 7,
      maxlength: 13,
      required: true,
    },
    isGold: {
      type: Boolean,
      default: false,
    },
  })
);

function validateCustomer(body) {
  const schema = Joi.object({
    name: Joi.string().min(4).required(),
    phone: Joi.required(),
    isgold: Joi.boolean().optional(),
  });
  return schema.validate(body);
}
exports.Customer = Customer;
exports.validate = validateCustomer;
