const express = require('express');
const router = express.Router();
const app = require(__dirname+'/../server.js');
const api_controller = require('../controllers/apiController.js');

// Show
router.post('/show/feed', api_controller.showNews);
router.post('/show/text', api_controller.index);

// Update
router.post('/update/colors', api_controller.colors);
router.post('/update/speed', api_controller.speed);

// Get
router.get('/get/history', api_controller.history);
router.get('/get/phrase', api_controller.phrase);
router.get('/get/feed', api_controller.feedlist);

// Add
router.post('/add/phrase', api_controller.addPhrase);
router.post('/add/feed', api_controller.addFeed);

// Test
router.get('/test', api_controller.test);

module.exports = router;