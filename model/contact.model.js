const mongoose = require("mongoose")
const contactschema = mongoose.Schema(
    {

        name: {
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
        message: {
            type: String
        },
        service: {
            type: String,
            required: true
        },
        company:{
            type:String
        },
        country:{
            type:String
        },
        state:{
            type:String
        },
        city:{
            type:String
        },
        CreatedAt: { type: Date, default: Date.now }
    }
)
const ContactModel = mongoose.model("contact", contactschema)
module.exports = { ContactModel }