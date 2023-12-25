const Vaccine = require("../models/Vaccine");
const RegisterVaccination = require("../models/Register_vaccination");
const PatientVaccination = require("../models/Patient_vaccination");

const AddRegisterVaccination = async (req, res) => {
  const {
    vaccine_id,
    user_id,
    relationship_guardian,
    guardian,
    status,
    code_number,
    phone_number,
    name,
    gender,
    address,
    birthday,
    target_date,
  } = req.body;

  try {
    const vaccine = await Vaccine.findById(vaccine_id);
    if (!vaccine) return res.status(400).json({ message: "Vaccine not found" });
    const registerVaccination = new RegisterVaccination({
      vaccine_id,
      user_id,
      relationship_guardian,
      guardian,
      status,
      code_number,
      name,
      gender,
      phone_number,
      address,
      birthday,
      target_date,
    });
    await registerVaccination.save();
    res.status(200).json({ message: "Register Vaccination successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getRegisterVaccination = async (req, res) => {
  try {
    const registerVaccination = await RegisterVaccination.find()
      .populate("vaccine_id")
      .populate("user_id", "gender , phone");

    res.status(200).json({ registerVaccination });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRegisterVaccination = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await RegisterVaccination.findByIdAndUpdate(id, {
      status,
    });
    res.status(200).json({
      RegisterVaccination,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  AddRegisterVaccination,
  getRegisterVaccination,
  updateRegisterVaccination,
};
