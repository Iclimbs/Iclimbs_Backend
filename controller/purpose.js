const express = require("express")
const { PurposeModel } = require("../model/contact.pupose.model")
const purposeRouter = express.Router()

purposeRouter.get("/list", async (req, res) => {
    try {
        const purpose = await PurposeModel.find()
        res.json({ status: "success", data: purpose,component:"purpose" })
    } catch (error) {
        res.json({ status: "error", message: "List Fetch Failed" })
    }
})


module.exports = { purposeRouter }