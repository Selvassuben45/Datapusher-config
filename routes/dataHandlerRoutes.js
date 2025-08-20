const express = require('express');
const router = express.Router();
const {authenticate,isAdmin,loggedout} =require('../middleware/middleware');
const  createcontrollers  = require('../controllers/dataController');

router.post('/data',authenticate,isAdmin,loggedout,createcontrollers.createdata);

module.exports = router;