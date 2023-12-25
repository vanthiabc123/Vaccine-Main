const VaccinePlan = require("../models/VaccinePlan");
const Vaccine = require("../models/Vaccine");

const addVaccinePlan = async (req, res) => {
  const { vaccine_id, date, time } = req.body;
  try {
    const vaccinePlan = new VaccinePlan({
      vaccine_id,
      date,
      time,
    });
    await vaccinePlan.save();
    res.status(200).json({ vaccinePlan });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVaccinePlan = async (req, res) => {
  try {
    const vaccinePlan = await VaccinePlan.find().populate("vaccine_id");
    res.status(200).json({ vaccinePlan });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVaccinePlan = async (req, res) => {
  const { id } = req.params;
  try {
    const vaccinePlan = await VaccinePlan.findByIdAndDelete(id);
    res.status(200).json({ vaccinePlan });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVaccinePlan = async (req, res) => {
  const { id } = req.params;
  const { vaccine_id, date, time } = req.body;
  try {
    const vaccinePlan = await VaccinePlan.findByIdAndUpdate(id, {
      vaccine_id,
      date,
      time,
    }).populate("vaccine_id");
    res.status(200).json({ vaccinePlan });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addVaccinePlan,
  getVaccinePlan,
  deleteVaccinePlan,
  updateVaccinePlan,
};
