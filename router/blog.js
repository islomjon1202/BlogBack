const express = require("express");
const { Blog, validateProduct } = require("../models/blogSchema");
const { default: mongoose } = require("mongoose");
const { authModel } = require("../models/auth.model");
const os = require('os');

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const blog = await Blog.find();
    res
      .status(200)

      .json({ state: true, msg: "found", innerData: blog });
  } catch (error) {
    res
      .status(500)
      .json({ state: false, msg: error.message, innerData: null });
  }
});

router.post("/", async (req, res) => {
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
  } catch (error) {
    res
      .status(500)
      .json({ state: false, msg: error.message, innerData: null });
  }
});
router.delete("/:proID", async (req, res) => {
  try {
    let id = req.params.proID;
    let delPro = await Blog.findByIdAndRemove(id);
    res.status(201).json({ state: true, msg: "deleted", innerData: delPro });
  } catch (error) {
    res
      .status(500)
      .json({ state: false, msg: error.message, innerData: null });
  }
});


router.get("/item/:id", async (req, res) => {
  try {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ msg: "Invalid id" })

    const networkInterfaces = os.networkInterfaces();

    const macAdress = networkInterfaces['Беспроводная сеть'][1].mac;

    const existMacAddress = await authModel.findOne({ mac_address: macAdress })

    if (existMacAddress && !existMacAddress.block_ids.includes(id))
      await existMacAddress.updateOne({ $push: { block_ids: id } })


    const blog = await Blog.findById(id)

    return res.status(200).json(blog)

  } catch (error) {
    return res
      .status(500)
      .json({ state: false, msg: error.message, innerData: null });
  }
})


router.get('/recently-blog', async (req, res) => {
  try {

    let blog;

    const networkInterfaces = os.networkInterfaces();

    const macAdress = networkInterfaces['Беспроводная сеть'][1].mac;

    const existMacAddress = await authModel.findOne({ mac_address: macAdress })

    console.log(blog)


    if (existMacAddress)
      blog = await Blog.find({ _id: { $in: existMacAddress.block_ids } })

    return res.status(200).json({ status: Boolean(blog), recently_blog: blog })

  } catch (error) {
    return res
      .status(500)
      .json({ state: false, msg: error.message, innerData: null });
  }
})


//router.post("/create", (req, res)=>{
//  let newUser = {
//      ...req.body
//  }
//  res.send(newUser)
//})

module.exports = router;