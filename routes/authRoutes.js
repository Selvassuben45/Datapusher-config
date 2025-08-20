
const express = require('express');
const { check, validationResult } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', [check('name').notEmpty().withMessage('Name is required'),
check('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
check('password').notEmpty().withMessage('Password is required').isAlphanumeric().withMessage('Password must be alphanumeric'),
], authController.registerUser);
router.post('/logout', authController.logoutUser);

module.exports = router;