const express = require("express");
const router = express.Router();
const fakultetiController = require("../controllers/fakultetiController");
const ngarkesaRouter = require("./ngarkesat/ngarkesaRouter");
const evidencaRouter = require("./evidencat/evidencaRouter");
const departamentiRouter = require("./departamentiRouter");
const authController = require("../controllers/users/authController");
const checkMiddleware=require("../middleware/checkAuth")

router.use("/:fakulteti/:vitiakademik/ngarkesa", ngarkesaRouter);
router.use(
  "/:fakulteti/departamenti/:dep/:vitiakademik/evidenca",
  evidencaRouter
); //per gjenerim te formularit financ pdf
router.use(
  "/:fakulteti/departamenti/:dep/pedagogu/:pedagogu/:vitiakademik/evidenca",
  evidencaRouter
);
router.use("/:id/departamenti", departamentiRouter);

router
  .route("/")
  .get(
   checkMiddleware.isAuthenticated,
    //authController.restrictTo("admin", "pedagog"),
    fakultetiController.getAllFakulteti
  )
  .post(fakultetiController.checkBody, fakultetiController.createFakulteti);

router
  .route("/:id")
  .get(fakultetiController.getFakulteti)
  .patch(fakultetiController.updateFakulteti)
  .delete(fakultetiController.deleteFakulteti);

module.exports = router;
