const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authenticationController/authController");

//router.route("/getCurrentUser").get(authenticateUser);
router.get(
  "/checkauth",
  authController.isLoggedIn,
  authController.getCurrentUser
);

module.exports = router;
