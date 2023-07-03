const mongoose = require("mongoose")
const Joi = require("joi")

let blogSchema = new mongoose.Schema({
  img: {
    type: String,
    require: true
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
  }
})
const Blog = mongoose.model("blog", blogSchema)

const validateProduct = (body)=>{
  let schema = Joi.object({
      img: Joi.string(),
      author: Joi.string().required(),
      desc: Joi.string().required(),
      title: Joi.string().required()
  })
  return schema.validate(body)
}

module.exports = { Blog, validateProduct }
