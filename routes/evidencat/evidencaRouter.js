const express = require('express');

const evidencaController= require("../../controllers/evidencat/evidencaController");
evidencepermbajtjaRouter=require("../evidencepermbajtja/evidencepermbajtjaRouter");
const router = express.Router({mergeParams:true });

router.use("/:evid/evidencepermbajtja",evidencepermbajtjaRouter);







router
.route("/")
.get(evidencaController.getAllEvidenca)  // kjo do te duhet per PDF e departamentit
.post(evidencaController.createEvidenca);

router
  .route('/:id')
  .get(evidencaController.getEvidenca)
  .patch(evidencaController.updateEvidenca)
  .delete(evidencaController.deleteEvidenca);




module.exports = router;