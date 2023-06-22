const express = require("express");
const { Images, validateImage } = require("../models/imageSchema");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const images = await Images.find();
    res
      .status(200)
      .json({ state: true, msg: "found", innerData: images });
  } catch {
    res
      .status(500)
      .json({ state: false, msg: "server error", innerData: null });
  }
});


router.post("/banner",  async (req, res) => {
  try {
    let { error } = validateImage(req.body);
    if (error) {
      return res
        .status(400)
        .json({ state: false, msg: error.details[0].message, innerData: null });
    }
    let { img } = req.body;
    let newPro = await Images.create({
      img
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
    let delPro = await Images.findByIdAndRemove(id);
    res.status(201).json({ state: true, msg: "deleted", innerData: delPro });
  } catch {
    res
      .status(500)
      .json({ state: false, msg: "server error", innerData: null });
  }
});


module.exports = router;