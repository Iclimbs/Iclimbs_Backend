const express = require("express");
const multer = require("multer");
const { BlogModel } = require("../model/blog.model");
const BlogRouter = express.Router();
const path = require("path");
const uploadPath = path.join(__dirname, "../public/images/blogs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    let uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

BlogRouter.post("/new", upload.single("banner"), async (req, res) => {
  const {
    title,
    heading1,
    heading2,
    heading3,
    subheading1,
    subheading2,
    subheading3,
    keywords,
  } = req.body;
  const fileName = req.file.filename;
  try {
    const blog = new BlogModel({
      banner: fileName,
      title,
      heading1,
      heading2,
      heading3,
      subheading1,
      subheading2,
      subheading3,
      keywords,
    });
    await blog.save();
    return res.json({ status: "Success", message: "New Blog Post Created!!" });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      message: "New Blog Post Creation Unsuccessful!!",
    });
  }
});

BlogRouter.get("/list", async (req, res) => {
  try {
    const list = await BlogModel.find({});
    return res.json({ status: "success", list: list });
  } catch (error) {
    return res.json({ status: "error", message: "Fetching Denied" });
  }
});

BlogRouter.patch("/update/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    await BlogModel.findByIdAndUpdate(_id, req.body);
    return res.json({ status: "success", message: "Blog Data Updated!!" });
  } catch (error) {
    return res.json({
      status: "error",
      message: "Blog Data Updation Unsuccessful!!",
    });
  }
});

BlogRouter.delete("/delete/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    await BlogModel.findByIdAndDelete(_id)
    return res.json({ status: "success", message: "Blog Data Deleted!!" });
  } catch (error) {
    return res.json({
      status: "error",
      message: "Blog Data Updation Unsuccessful!!",
    });
  }
});


module.exports = { BlogRouter };
