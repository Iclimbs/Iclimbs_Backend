const router = require("express").Router();
const { CareerRouter } = require("../controller/career");
const { contactRouter } = require("../controller/contact");
const { purposeRouter } = require("../controller/purpose");
const { userRouter } = require("../controller/user");
const { BlogRouter } = require("../controller/blog");
const { webContactRouter } = require("../controller/websitecontact");
router
  .use("/contact", contactRouter)
  .use("/web/contact", webContactRouter)
  .use("/career", CareerRouter)
  .use("/user", userRouter)
  .use("/purpose", purposeRouter)
  .use("/validate", require("../controller/validate"))
  .use("/blog", BlogRouter)

module.exports = router;
