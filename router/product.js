const express = require("express");
const { Products, validateProduct } = require("../models/productSchema");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Products.find();
    res
      .status(200)
      .json({ state: true, msg: "found", innerData: products });
  } catch {
    res
      .status(500)
      .json({ state: false, msg: "server error", innerData: null });
  }
});


router.post("/cards",  async (req, res) => {
  try {
    let { error } = validateProduct(req.body);
    if (error) {
      return res
        .status(400)
        .json({ state: false, msg: error.details[0].message, innerData: null });
    }
    let { title, button, author, img, desc } = req.body;
    let newPro = await Products.create({
      title,
      button,
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
    let delPro = await Products.findByIdAndRemove(id);
    res.status(201).json({ state: true, msg: "deleted", innerData: delPro });
  } catch {
    res
      .status(500)
      .json({ state: false, msg: "server error", innerData: null });
  }
});


module.exports = router;