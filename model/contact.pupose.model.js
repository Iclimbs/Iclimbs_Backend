const mongoose = require("mongoose")
const contactpurposeschema = mongoose.Schema(
    {
        name: String,
        label: String
    }
)
const PurposeModel = mongoose.model("purpose", contactpurposeschema)
module.exports = { PurposeModel }