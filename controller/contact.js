const express = require("express")
const { ContactModel } = require("../model/contact.model")
const contactRouter = express.Router()

contactRouter.post("/new", async (req, res) => {
    try {
        console.log("req.body",req.body);
        const { name, email, phone, message, subject } = req.body
        const contact = new ContactModel({ name, email, phone, message, subject })
        await contact.save()
        res.json({ status: "success", message: "Your Query is Successfully Registered" })
    } catch (error) {
        res.json({ status: "error", message: "Your Query Registration is Unsuccessful." })
    }
})

module.exports = { contactRouter }