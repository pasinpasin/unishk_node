const express = require("express");
const router = express.Router({ mergeParams: true });
const programiController = require("../controllers/programiController");

router
  .route("/")
  .get(programiController.getAllProgrami)
  .post(programiController.checkBody, programiController.createProgrami);

router
  .route("/:id")
  .get(programiController.getProgrami)
  .patch(programiController.updateProgrami)
  .delete(programiController.deleteProgrami);

module.exports = router;
