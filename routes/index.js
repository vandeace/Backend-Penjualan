const express = require('express');
const router = express.Router();

const {create : createCustomer,show: showCustomer} = require('../controllers/customer')

router.post('createCustomer', createCustomer);
router.get('showCustomer', showCustomer)

module.exports = router;