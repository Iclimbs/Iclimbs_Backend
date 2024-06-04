const router = require("express").Router()
const { CareerRouter } = require("../controller/career")
const { contactRouter } = require("../controller/contact")
const { enquiryRouter } = require("../controller/enquiry")
const { purposeRouter } = require("../controller/purpose")
const { userRouter } = require("../controller/user")

router
    .use("/contact", contactRouter)
    .use("/career", CareerRouter)
    .use("/enquiry", enquiryRouter)
    .use("/user",userRouter)
    .use("/purpose",purposeRouter)
    .use("/validate",require("../controller/validate"))

module.exports = router 