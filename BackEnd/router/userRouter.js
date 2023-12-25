const express = require("express");
const router = express.Router();

const {
  getUsers,
  updateUser,
  getUserById,
  updateRole,
} = require("../controller/userController");
const { isAdmin,allowRole } = require("../middleware/middlewareController");
const fileUpload = require("../middleware/cloudinary");

router.get("/",  allowRole([ "admin"]), getUsers);
router.put("/updateRole", updateRole);
router.put("/:id", fileUpload.single("avatar"), updateUser);
router.get("/:id", getUserById);

module.exports = router;
