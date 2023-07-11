const router = require("express").Router();
const os = require('os');
const { authModel } = require("../models/auth.model");


router.get('/register', async (req, res) => {
    try {
        const networkInterfaces = os.networkInterfaces();
        const macAdress = networkInterfaces['Беспроводная сеть'][1].mac;

        const existMacAddress = await authModel.findOne({ mac_address: macAdress })

        if (existMacAddress)
            return res.status(403).json({ msg: "Your mac address already exist" })

        await authModel.create({
            mac_address: macAdress,
        })
        res.status(200).json({ msg: "Your mac address created" })
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
})


router.get('/all-information', async (req, res) => {
    try {
        const all = await authModel.find()

        res.status(200).json(all)
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
})

module.exports = router