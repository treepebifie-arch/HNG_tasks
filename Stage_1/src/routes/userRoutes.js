const express = require('express');
const router = express.Router();
const User = require('../models/userModels.js');

const userController = require('../controller/userController.js');

router.post('/profiles', userController.createUSer);
router.get('/profiles/:id', userController.getUserById);
router.get('/profiles', userController.getAllUsers);
router.delete('/profiles/:id', userController.deleteUser);

module.exports = router;