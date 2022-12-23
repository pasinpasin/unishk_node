const express = require('express');
const ngarkesaController = require('../../controllers/ngarkesat/ngarkesaController');
const ngarkesepermbajtjaRouter= require("../ngarkesepermbajtja/ngarkesepermbajtjaRouter");

const router = express.Router({mergeParams:true });

router.use("/:ngid/ngarkesepermbajtja",ngarkesepermbajtjaRouter);





router
.route("/")
.get(ngarkesaController.getAllNgarkesa)
.post(ngarkesaController.createNgarkesa);

 router
.route('/pdf')
//get(planpermbajtjaController.getAllPlanpermbajtja)
.get(ngarkesaController.krijoPDF)
; 

module.exports = router;