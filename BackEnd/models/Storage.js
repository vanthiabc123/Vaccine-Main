const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storageSchema = new Schema(
  {
    vaccine_id: {
      type: Schema.Types.ObjectId,
      ref: "Vaccine",
    },
    quantity: { type: Number, default: 0 }, // số lượng
    quantity_sold: { type: Number, default: 0 }, // số lượng đã bán
    quantity_import: { type: Number, default: 0 }, // số lượng đã nhập
  },
  {
    timestamps: true,
  }
);

const Storage = mongoose.model("Storage", storageSchema);
module.exports = Storage;
