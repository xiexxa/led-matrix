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
router.post('/update/feed', api_controller.updateFeed);
router.post('/update/pause', api_controller.updatePause);
router.post('/update/stop', api_controller.updateStop);

// Get
router.get('/get/history', api_controller.history);
router.get('/get/phrase', api_controller.phrase);
router.get('/get/feed', api_controller.feedlist);
router.get('/get/status', api_controller.status);

// Add
router.post('/add/phrase', api_controller.addPhrase);
router.post('/add/feed', api_controller.addFeed);

// Delete
router.post('/delete/phrase', api_controller.deletePhrase);

// Test
router.get('/test', api_controller.test);
router.get('/gaming', api_controller.gaming);

module.exports = router;