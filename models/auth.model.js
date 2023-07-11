const mongoose = require("mongoose")


let authSchema = new mongoose.Schema({
    mac_address: String,
    block_ids: {
        type: Array,
        default: []
    }
})
const authModel = mongoose.model("auth", authSchema)


module.exports = { authModel, }
