const express = require('express');
const router = express.Router();
const planpermbajtjaController = require('../controllers/planpermbajtjaController');

router
 .route('/')
.get(planpermbajtjaController.getAllPlanpermbajtja)
  ;
 /*  router
  .route('/pdf')
  .get(planpermbajtjaController.generatePDF)
  ;
 */

  router
  .route('/:viti')
  .post( planpermbajtjaController.createPlanpermbajtja);

  router
  .route('/:id')
  .get(planpermbajtjaController.getPlanpermbajtja)
  .patch(planpermbajtjaController.updatePlanpermbajtja)
  .delete(planpermbajtjaController.deletePlanpermbajtja)
 ;







  module.exports = router;