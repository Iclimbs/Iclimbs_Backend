const router = require("express").Router()
const { CareerRouter } = require("../controller/career")
const { contactRouter } = require("../controller/contact")
const { enquiryRouter } = require("../controller/enquiry")
const { userRouter } = require("../controller/user")

router
    .use("/contact", contactRouter)
    .use("/career", CareerRouter)
    .use("/enquiry", enquiryRouter)
    .use("/user",userRouter)

module.exports = router 