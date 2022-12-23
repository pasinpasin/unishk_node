const express = require('express');
const router = express.Router();
const fakultetiController = require('../controllers/fakultetiController');
const ngarkesaRouter= require("./ngarkesat/ngarkesaRouter");
const evidencaRouter= require("./evidencat/evidencaRouter");

router.use("/:fakulteti/:vitiakademik/ngarkesa",ngarkesaRouter);
router.use("/:fakulteti/departamenti/:dep/:vitiakademik/evidenca",evidencaRouter);  //per gjenerim te formularit financ pdf
router.use("/:fakulteti/departamenti/:dep/pedagogu/:pedagogu/:vitiakademik/evidenca",evidencaRouter);


router
  .route('/')
  .get(fakultetiController.getAllFakulteti)
  .post(fakultetiController.checkBody,fakultetiController.createFakulteti);

  router
  .route('/:id')
  .get(fakultetiController.getFakulteti)
  .patch(fakultetiController.updateFakulteti)
  .delete(fakultetiController.deleteFakulteti);


  module.exports = router;