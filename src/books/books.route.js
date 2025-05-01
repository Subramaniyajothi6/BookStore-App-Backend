const express = require('express');
const router = express.Router();

const { postaBook, getallbooks, getsinglebook, updatebook, deletebook } = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');

// frontend =>backend server => controller =>book shcema => db => send to server => back to frontend
//post = when submit something from the frontend to backend 
//get = when get something from the db
//put = when edit/update something from backend
//delete = when delete something 


router.post("/create-book", verifyAdminToken, postaBook)
router.get('/',getallbooks);
router.get('/:id',getsinglebook);
router.put('/edit/:id',verifyAdminToken,updatebook);
router.delete('/:id',verifyAdminToken,deletebook);

module.exports = router;

