const mongoose = require("mongoose")
const careerschema = mongoose.Schema(
    {

        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        resume: {
            type: String,
            required: true
        },
        CreatedAt: { type: Date, default: Date.now }
    }
)
const CareerModel = mongoose.model("career", careerschema)
module.exports = { CareerModel }