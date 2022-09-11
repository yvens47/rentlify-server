const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const AuthController = require('../controllers/authController')


router.post("/login", body('email').isEmail(), AuthController.login);

router.post("/register", AuthController.register);
router.get("/signout", AuthController.signout);


module.exports = router