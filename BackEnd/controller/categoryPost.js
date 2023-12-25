const CategoryPost = require("../models/categoryPost");

const addCategory = async (req, res) => {
  const { name, slug } = req.body;
  try {
    const categoryPost = new CategoryPost({
      name,
      slug,
    });
    await categoryPost.save();
    res.status(200).json({ categoryPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const categoryPost = await CategoryPost.find();
    res.status(200).json({ categoryPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const categoryPost = await CategoryPost.findByIdAndDelete(id);
    res.status(200).json({ categoryPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  const { name, slug, id } = req.body;
  try {
    const categoryPost = await CategoryPost.findByIdAndUpdate(id, {
      name,
      slug,
    });
    res.status(200).json({ categoryPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addCategory, getCategory, deleteCategory, updateCategory };
