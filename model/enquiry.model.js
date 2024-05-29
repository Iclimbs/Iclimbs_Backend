const mongoose = require("mongoose")
const enquiry = mongoose.Schema(
    {
        name: String,
        phone: Number,
        email: String,
        message: String,
        subject: String
    })
const EnquiryModel = mongoose.model("enquiry", enquiry)
module.exports = { EnquiryModel }