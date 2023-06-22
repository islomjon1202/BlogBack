const mongoose = require("mongoose")
const Joi = require("joi")

let imageSchema = new mongoose.Schema({
  img: {
    type: String,
  }
})
const Images = mongoose.model("image", imageSchema)

const validateImage = (body)=>{
  let schema = Joi.object({
      img: Joi.string()
  })
  return schema.validate(body)
}

module.exports = { Images, validateImage }
