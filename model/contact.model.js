const mongoose = require("mongoose")
const contactschema = mongoose.Schema(
    {
        name: String,
        phone: Number,
        email: String,
        message: String,
        subject: String
    }
)
const ContactModel = mongoose.model("contact", contactschema)
module.exports = { ContactModel }