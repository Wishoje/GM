const express = require('express');
const router = express.Router();
const testController = require('../controllers/test');
console.log('yaya');
router.post("/",  testController.getAll);
module.exports = router;