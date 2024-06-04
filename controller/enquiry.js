const express = require("express")
const {EnquiryModel} = require("../model/enquiry.model")
const enquiryRouter = express.Router()

enquiryRouter.post("/new", async (req, res) => {
    try {
        console.log("req.body",req.body);
        const { name, email, phone, message, subject } = req.body
        const enquiry = new EnquiryModel({ name, email, phone, message, subject })
        await enquiry.save()
        res.json({ status: "success", message: "Your Enquiry is Successfully Registered" })
    } catch (error) {
        res.json({ status: "error", message: "Your Enquiry Registration is Unsuccessful." })
    }
})




module.exports = { enquiryRouter }