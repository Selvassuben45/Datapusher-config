const express = require('express');
const UserController = require('../controllers/userController');
const { check } = require('express-validator');

const router = express.Router();

router.post(
    '/login',
    [
        check('user', 'Username is required').not().isEmpty(),
        check('password', 'Password cannot be empty').not().isEmpty()
    ],
    UserController.Login);
module.exports = router;