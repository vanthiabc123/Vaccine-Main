const express = require("express");

const router = express.Router();
const {
  getStorage,
  deleteStorage,
  updateStorageByvaccine_id,
} = require("../controller/storageController");
const { isAdmin,allowRole } = require("../middleware/middlewareController");

router.get("/",  allowRole(["admin", "nhanvien"]), getStorage);
router.delete("/:id",  allowRole(["admin", "nhanvien"]), deleteStorage);
router.put("/",  allowRole(["admin", "nhanvien"]), updateStorageByvaccine_id);

module.exports = router;
