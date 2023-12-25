const express = require("express");
const router = express.Router();

const {
  addCategory,
  getCategory,
  deleteCategory,
  updateCategory,
} = require("../controller/categoryPost");

router.post("/add", addCategory);
router.get("/", getCategory);
router.delete("/delete/:id", deleteCategory);
router.put("/update", updateCategory);

module.exports = router;
