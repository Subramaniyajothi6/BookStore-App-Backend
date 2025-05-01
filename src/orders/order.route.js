const express = require('express');
const { creatAOrder, getOrderByEmail } = require('./order.controller');
const router = express.Router();

// create order endpoint 

router.post('/', creatAOrder)

// get the order by user email

router.get('/email/:email',getOrderByEmail)

module.exports = router;