const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");

router.post("/register", usersController.user_signup);

router.post("/login-user", usersController.user_login);


module.exports = router;