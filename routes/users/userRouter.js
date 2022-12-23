const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users/userController');
const ngarkesaController = require('../../controllers/ngarkesat/ngarkesaController');
const ngarkesaRouter= require("../../routes/ngarkesat/ngarkesaRouter");

router.use("/:pedagoguID/ngarkesa",ngarkesaRouter);


router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

  router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);




  module.exports = router;