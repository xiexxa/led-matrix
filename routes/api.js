const express = require('express');
const router = express.Router();
const app = require(__dirname+'/../server.js');
const api_controller = require('../controllers/apiController.js');

router.post('/', api_controller.index);
router.post('/colors', api_controller.colors);

module.exports = router;