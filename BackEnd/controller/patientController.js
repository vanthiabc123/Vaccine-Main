const PatientVaccination = require("../models/Patient_vaccination");
const Vaccine = require("../models/Vaccine");
const Storage = require("../models/Storage");
const getPatientVaccination = async (req, res) => {
  try {
    const patientVaccination = await PatientVaccination.find()
      .populate("vaccine_id")
      .sort({ createdAt: -1 });
    res.status(200).json({ patientVaccination });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPatientVaccinationById = async (req, res) => {
  const { id } = req.params;
  try {
    const patientVaccination = await PatientVaccination.findById(id).populate(
      "vaccine_id",
      "name"
    );
    res.status(200).json({ patientVaccination });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPatientStatus = async (req, res) => {
  try {
    const patientVaccination = await PatientVaccination.find({
      status: "Đã tiêm",
    }).populate("vaccine_id", "name");
    res.status(200).json({ patientVaccination });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addPatientVaccination = async (req, res) => {
  const {
    name,
    code_number,
    birthday,
    gender,
    guardian,
    phone_number,
    address,
    vaccine_id,
    relationship_guardian,
    registrationForm,
  } = req.body;
  try {
    const patientVaccination = new PatientVaccination({
      vaccine_id,
      name,
      code_number,
      birthday,
      gender,
      guardian,
      address,
      phone_number,
      relationship_guardian,
      registrationForm,
      status: "Chưa tiêm",
    });
    console.log(patientVaccination);
    await patientVaccination.save();
    res.status(200).json({ patientVaccination });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePatientVaccination = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    vaccine_id,
    code_number,
    birthday,
    gender,
    guardian,
    phone_number,
    address,
    cough,
    fever,
    spew,
    breath_heavily,
    convulsions,
  } = req.body;

  console.log(req.body);
  try {
    const patientVaccination = await PatientVaccination.findByIdAndUpdate(id, {
      vaccine_id,
      name,
      code_number,
      birthday,
      gender,
      guardian,
      phone_number,
      address,
      cough,
      fever,
      spew,
      breath_heavily,
      convulsions,
    });
    await patientVaccination.save();
    res.status(200).json({ message: "Update patientVaccination successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status, vaccine_id } = req.body;
  try {
    const patientVaccination = await PatientVaccination.findByIdAndUpdate(id, {
      status,
    });
    await patientVaccination.save();
    const storage = await Storage.findOneAndUpdate(
      { vaccine_id },
      { $inc: { quantity_sold: 1, quantity: -1 } }
    );
    await storage.save();
    res.status(200).json({
      message: "Update patientVaccination status successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStatusPayment = async (req, res) => {
  const { id, status_payment } = req.body;
  try {
    const patientVaccination = await PatientVaccination.findByIdAndUpdate(id, {
      status_payment,
    });
    await patientVaccination.save();
    res.status(200).json({
      message: "Update patientVaccination status successfully",
      patientVaccination,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePatientVaccination = async (req, res) => {
  const { id } = req.params;
  try {
    const patientVaccination = await PatientVaccination.findByIdAndDelete(id);
    res.status(200).json({ patientVaccination });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPatientVaccination,
  addPatientVaccination,
  updatePatientVaccination,
  updateStatus,
  deletePatientVaccination,
  getPatientVaccinationById,
  getPatientStatus,
  updateStatusPayment,
};
