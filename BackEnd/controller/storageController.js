const Storage = require("../models/Storage");

const getStorage = async (req, res) => {
  try {
    const storage = await Storage.find().populate("vaccine_id", "name");
    res.status(200).json({ storage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteStorage = async (req, res) => {
  const { id } = req.params;
  try {
    const storage = await Storage.findByIdAndDelete(id);
    await Storage.findOneAndDelete({ vaccine_id: id });
    res.status(200).json({ storage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStorageByvaccine_id = async (req, res) => {
  const { vaccine_id } = req.body;
  const { quantity_import, quantity } = req.body;
  try {
    const storage = await Storage.findOneAndUpdate(
      { vaccine_id },
      { quantity_import, quantity }
    );

    res.status(200).json({ storage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStorage,
  deleteStorage,
  updateStorageByvaccine_id, 
};
