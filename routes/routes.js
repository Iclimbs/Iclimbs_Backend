const router = require("express").Router()
const { contactRouter } = require("../controller/contact")
router.
    use("/contact", contactRouter)

module.exports = router 