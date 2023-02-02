const express = require("express");
const router = express.Router({ mergeParams: true });
const userController = require("../../controllers/users/userController");
const authController = require("../../controllers/users/authController");
const ngarkesaRouter = require("../../routes/ngarkesat/ngarkesaRouter");

router.use("/:pedagoguID/ngarkesa", ngarkesaRouter);

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
