const mongoose = require("mongoose")
const contactschema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        service: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        email:
        {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            required: true
        }
    }
)
const ContactModel = mongoose.model("contact", contactschema)
module.exports = { ContactModel }