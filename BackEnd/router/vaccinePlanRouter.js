const express = require("express");
const router = express.Router();
const {
  addVaccinePlan,
  getVaccinePlan,
  deleteVaccinePlan,
  updateVaccinePlan,
} = require("../controller/vaccinePlanController");
const { isAdmin ,allowRole} = require("../middleware/middlewareController");

router.post("/add",  allowRole(["admin", "nhanvien"]), addVaccinePlan);
router.get("/",  getVaccinePlan);
router.delete("/delete/:id",  allowRole(["admin", "nhanvien"]), deleteVaccinePlan);
router.put("/update/:id",  allowRole(["admin", "nhanvien"]), updateVaccinePlan);

module.exports = router;
