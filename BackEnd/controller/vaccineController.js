const Vaccine = require("../models/Vaccine");
const Storage = require("../models/Storage");

const addVaccine = async (req, res) => {
  const image = req.file.path;
  const { name, description, minAge, maxAge, dosage, origin, category, price } =
    req.body;
  try {
    const vaccine = new Vaccine({
      name,
      description,
      minAge,
      maxAge,
      dosage,
      origin,
      category,
      image,
      price,
    });
    await vaccine.save();
    // update Storage
    const storage = new Storage({
      vaccine_id: vaccine._id,
      quantity: 0,
      quantity_sold: 0,
      quantity_import: 0,
    });
    await storage.save();
    res.status(200).json({ vaccine });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVaccine = async (req, res) => {
  const queries = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queries[el]);
  let queryStr = JSON.stringify(queries);
  queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);

  try {
    const vaccine = await Vaccine.find(JSON.parse(queryStr));
    res.status(200).json({ vaccine });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVaccine = async (req, res) => {
  const { id } = req.params;
  try {
    const vaccine = await Vaccine.findByIdAndDelete(id);
    res.status(200).json({ vaccine });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVaccine = async (req, res) => {
  const { id } = req.params;
  // neu khong co image thi lay image cu
  let image = req.file ? req.file.path : req.body.image;
  const { name, description, minAge, maxAge, dosage, origin, price } = req.body;
  try {
    const vaccine = await Vaccine.findByIdAndUpdate(id, {
      name,
      description,
      minAge,
      maxAge,
      dosage,
      origin,
      price,
      image,
    });
    res.status(200).json({ vaccine });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getVaccineById = async (req, res) => {
  const { id } = req.params;
  try {
    const vaccine = await Vaccine.findById(id);
    res.status(200).json({ vaccine });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addVaccine,
  getVaccine,
  deleteVaccine,
  updateVaccine,
  getVaccineById,
};
