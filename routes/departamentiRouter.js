const express = require("express");
const router = express.Router({ mergeParams: true });
const departamentiController = require("../controllers/departamentiController");
const ngarkesaRouter = require("./ngarkesat/ngarkesaRouter");
const programiRouter = require("./programiRouter");

router.use("/:dep/:vitiakademik/ngarkesa", ngarkesaRouter);
router.use("/:dep/:vitiakademik/ngarkesa/pdf", ngarkesaRouter);
router.use("/:id/programi", programiRouter);

router
  .route("/")
  .get(departamentiController.getAllDepartamenti)
  .post(
    departamentiController.checkBody,
    departamentiController.createDepartamenti
  );

router
  .route("/:id")
  .get(departamentiController.getDepartamenti)
  .patch(departamentiController.updateDepartamenti)
  .delete(departamentiController.deleteDepartamenti);

module.exports = router;
