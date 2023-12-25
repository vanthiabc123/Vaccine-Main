const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoryPostSchema = new Schema(
  {
    name: {
      type: String,
    },
    slug: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CategoryPost", categoryPostSchema);
