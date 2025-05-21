const express = require('express');
const authController = require('../../controller/auth.controller');

const router = express.Router();

// Register a new user
router.post('/signup',authController.signUp);

// Authenticate user and return token
router.post('/signin', authController.signIn);

module.exports = router;