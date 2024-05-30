const express = require("express")
const { ContactModel } = require("../model/contact.model")
const contactRouter = express.Router()

contactRouter.post("/new", async (req, res) => {
    try {
        const { name, email, service, phone, message, subject } = req.body
        const contact = new ContactModel({ name, email, phone, service, message, subject })
        await contact.save()
        res.json({ status: "success", message: "Your Query is Successfully Registered" })
    } catch (error) {
        res.json({ status: "error", message: "Your Query Registration is Unsuccessful." })
    }
})



contactRouter.get("/list", async (req, res) => {
    try {
        const contact = await ContactModel.find()
        res.json({ status: "success", list: contact })
    } catch (error) {
        res.json({ status: "error", message: "List Fetch Failed" })
    }
})


module.exports = { contactRouter }