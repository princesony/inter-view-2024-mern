// routes/authRoutes.js
const express = require('express');
const { registerUser,loginUser,refreshUserData } = require('../controller/authCtrl');
const auth  = require("../middleware/auth");
const router = express.Router();

//create router  middleware that will verify the token in headers for
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/refresh_token', auth ,refreshUserData);

module.exports = router;
