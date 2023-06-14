const mongoose = require("mongoose")
const Joi = require("joi")

let productSchema = new mongoose.Schema({
  img: {
    type: String
  },
  author: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  desc: {
    type: String,
    require: true
  },
  button: {
    type: Array,
    require: true
  }
})
const Products = mongoose.model("product", productSchema)

const validateProduct = (body)=>{
  let schema = Joi.object({
      img: Joi.string(),
      author: Joi.string().required(),
      desc: Joi.string().required(),
      button: Joi.array().required(),
      title: Joi.string().required(),
  })
  return schema.validate(body)
}

module.exports = { Products, validateProduct }
