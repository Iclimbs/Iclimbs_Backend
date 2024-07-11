const mongoose = require("mongoose");
const blogschema = mongoose.Schema({
  banner: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  shortinfo: {
    type: String,
    required: true,
  },
  CreatedAt: { type: Date, default: Date.now },
});
const BlogModel = mongoose.model("blogs", blogschema);
module.exports = { BlogModel };
