const express = require('express');
const router = express.Router();
const { authenticate  ,isAdmin,loggedout} = require('../middleware/middleware');
const accountcontroller = require('../controllers/accountController');
router.post('/createaccount',authenticate,loggedout,isAdmin,accountcontroller.createAccount)
router.get('/getaccounts', isAdmin,accountcontroller.getaccounts);
router.get('/accounts/:id',authenticate,loggedout, accountcontroller.getaccountsbyid);
router.get('/accounts/',authenticate,loggedout, accountcontroller.accounts)
router.post('/updateaccount/:id',authenticate,loggedout,isAdmin, accountcontroller.updateAccount);
router.post('/deleteaccount/:id',authenticate,loggedout, isAdmin, accountcontroller.deleteAccount);
module.exports = router;