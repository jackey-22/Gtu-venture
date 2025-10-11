const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// GET all programs
router.get('/get-programs', userController.fetchPrograms);

module.exports = router;
