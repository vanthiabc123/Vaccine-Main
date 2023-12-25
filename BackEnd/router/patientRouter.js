const express = require("express");

const router = express.Router();

const {
  getPatientVaccination,
  addPatientVaccination,
  updatePatientVaccination,
  deletePatientVaccination,
  getPatientVaccinationById,
  updateStatus,
  getPatientStatus,
  updateStatusPayment,
} = require("../controller/patientController");
const { isAdmin, allowRole } = require("../middleware/middlewareController");

router.get(
  "/",
  getPatientVaccination
);
router.post(
  "/",
  allowRole(["admin", "user", "nhanvien"]),
  addPatientVaccination
);
router.put("/:id", allowRole(["admin", "nhanvien"]), updatePatientVaccination);
router.put("/status/:id", allowRole(["admin", "nhanvien"]), updateStatus);
router.delete(
  "/:id",
  allowRole(["admin", "nhanvien"]),
  deletePatientVaccination
);
router.get("/:id", getPatientVaccinationById);
router.get("/api/v1/getPatientStatus", getPatientStatus);
router.put(
  "/api/v1/statusPayment",
  allowRole(["admin", "nhanvien"]),
  updateStatusPayment
);

module.exports = router;
