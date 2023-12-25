const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vaccinePlanSchema = new Schema(
  {
    vaccine_id: {
      type: Schema.Types.ObjectId,
      ref: "Vaccine",
    },
    date: {
      type: Date,
    },
    time: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const VaccinePlan = mongoose.model("VaccinePlan", vaccinePlanSchema);
module.exports = VaccinePlan;
