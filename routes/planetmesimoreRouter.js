const express = require('express');
const router = express.Router();
const planetmesimoreController = require('../controllers/planetmesimoreController');
const planpermbajtjaController = require('../controllers/planpermbajtjaController');


router
  .route('/')
  .get(planetmesimoreController.getAllPlanetmesimore)
  .post(planetmesimoreController.checkBody,planetmesimoreController.createPlanetmesimore);

router
  .route('/pdf/:id')
  //get(planpermbajtjaController.getAllPlanpermbajtja)
  .get(planetmesimoreController.generatePDF)
  ;


 
  router
  .route('/:id')
  .get(planetmesimoreController.getPlanetmesimore)
  .patch(planetmesimoreController.updatePlanetmesimore)
  .delete(planetmesimoreController.deletePlanetmesimore)
  ;
 
 

 


  module.exports = router;