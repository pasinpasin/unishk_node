const express = require('express');
const router = express.Router();
const departamentiController = require('../controllers/departamentiController');
const ngarkesaRouter= require("./ngarkesat/ngarkesaRouter");


router.use("/:dep/:vitiakademik/ngarkesa",ngarkesaRouter);
router.use("/:dep/:vitiakademik/ngarkesa/pdf",ngarkesaRouter);

router
  .route('/')
  .get(departamentiController.getAllDepartamenti)
  .post(departamentiController.checkBody,departamentiController.createDepartamenti);

  router
  .route('/:id')
  .get(departamentiController.getDepartamenti)
  .patch(departamentiController.updateDepartamenti)
  .delete(departamentiController.deleteDepartamenti);




  module.exports = router;