const mongoose = require("mongoose")
const careerschema = mongoose.Schema(
    {
        firstname: String,
        lastname:String,
        mobile: Number,
        email: String,
        resume:String
    }
)
const CareerModel = mongoose.model("career", careerschema)
module.exports = { CareerModel }