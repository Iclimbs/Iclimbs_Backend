const express = require("express")
const { ContactModel } = require("../model/contact.model")
const { admin } = require("../middleware/admin.middleware")
const contactRouter = express.Router()

contactRouter.post("/new", async (req, res) => {
    try {
        const { name, email, phone, message, service } = req.body
        const contact = new ContactModel({ name, email, phone, message, service })
        await contact.save()
        res.json({ status: "success", message: "Your Query is Registered Successfully" })
    } catch (error) {
        console.log(error);
        res.json({ status: "error", message: "Your Query Registration is Unsuccessful." })
    }
})



contactRouter.get("/list", admin, async (req, res) => {
    try {
        const contact = await ContactModel.find()
        res.json({ status: "success", list: contact })
    } catch (error) {
        res.json({ status: "error", message: "Your Query Registration is Unsuccessful." })
    }
})

module.exports = { contactRouter }