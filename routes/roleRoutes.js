const express = require('express');
const app = express();
const {authenticate,loggedout} = require('../middleware/middleware');
const router = express.Router();
const rolecontroller = require('../controllers/roleController');
router.get('/roles',authenticate,loggedout,rolecontroller.getRoles);

module.exports = router;