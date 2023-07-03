 const express = require("express");
const { Blog, validateProduct } = require("../models/blogSchema");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const blog = await Blog.find();
    res
      .status(200)
      
      .json({ state: true, msg: "found", innerData: blog });
  } catch {
    res
      .status(500)
      .json({ state: false, msg: "server error", innerData: null });
  }
}); 

router.post("/",  async (req, res) => {
  try {
    let { error } = validateProduct(req.body);
    if (error) {
      return res
        .status(400)
        .json({ state: false, msg: error.details[0].message, innerData: null });
    }
    let { title, author, img, desc } = req.body;
    let newPro = await Blog.create({
      title,
      img,
      author,
      desc
    });
    let savePro = await newPro.save();
    res.status(201).json({ state: true, msg: "saqlandi", innerData: savePro });
  } catch {
    res
      .status(500)
      .json({ state: false, msg: "server error", innerData: null });
  }
});
router.delete("/:proID",  async (req, res) => {
  try {
    let id = req.params.proID;
    let delPro = await Blog.findByIdAndRemove(id);
    res.status(201).json({ state: true, msg: "deleted", innerData: delPro });
  } catch {
    res
      .status(500)
      .json({ state: false, msg: "server error", innerData: null });
  }
});


//router.post("/create", (req, res)=>{
//  let newUser = {
//      ...req.body
//  }
//  res.send(newUser)
//})

module.exports = router;