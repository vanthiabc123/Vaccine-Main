const express = require("express");
const router = express.Router();
const registerVaccinationController = require("../controller/RegisterVaccinationController");

router.post("/", registerVaccinationController.AddRegisterVaccination);
router.get("/", registerVaccinationController.getRegisterVaccination);
router.put("/:id", registerVaccinationController.updateRegisterVaccination);

module.exports = router;
