const express = require('express');
const router = express.Router();
const {authenticate,loggedout} = require('../middleware/middleware');
const destinationController = require('../controllers/destinationController');

router.post('/createdestination',authenticate,loggedout,destinationController.createdestination)
router.get('/getDestination',authenticate,loggedout,destinationController.getDestination);
router.get('/getDestinations/:id',authenticate,loggedout,destinationController.getDestinationbyid);
router.post('/updatedestination/:id',authenticate,loggedout,destinationController.updatedestination);
router.post('/deletedestinations/:id',authenticate,loggedout,destinationController.deletedestination)
router.get('/destination',authenticate,loggedout,destinationController.getDestinationsearch)
module.exports = router;
