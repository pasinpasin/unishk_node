const express = require('express');
const router = express.Router({mergeParams:true });
const evidencepermbajtjaController=require("../../controllers/evidencepermbajtja/evidencepermbajtjaController");



router
.route("/")
.get(evidencepermbajtjaController.getAllEvidenca) // kjo duhet per pdf
.post(evidencepermbajtjaController.createEvidenca);

router
  .route('/:id')
  .get(evidencepermbajtjaController.getEvidenca)
  .patch(evidencepermbajtjaController.updateEvidenca)
  .delete(evidencepermbajtjaController.deleteEvidenca);




module.exports = router;