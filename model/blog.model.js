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
  heading1: {
    type: String,
    required: true,
  },
  heading2: {
    type: String,
    required: true,
  },
  heading3: {
    type: String,
    required: true,
  },
  heading4: {
    type: String,
  },
  heading5: {
    type: String,
  },
  subheading1: {
    type: String,
    required: true,
  },
  subheading2: {
    type: String,
    required: true,
  },

  subheading3: {
    type: String,
    required: true,
  },
  subheading4: {
    type: String,
  },
  subheading5: {
    type: String,
  },
  keywords: {
    type: [String],
    required: true,
  },
  CreatedAt: { type: Date, default: Date.now },
});
const BlogModel = mongoose.model("blogs", blogschema);
module.exports = { BlogModel };
