const express = require('express');
const router = express.Router();
const genderController = require('../controller/controller.js');

router.get('/classify', genderController.getGender);

module.exports = router;