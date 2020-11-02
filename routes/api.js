const express = require('express');
const router = express.Router();
const app = require(__dirname+'/../server.js');
const api_controller = require('../controllers/apiController.js');

router.post('/', api_controller.index);
router.post('/colors', api_controller.colors);
router.get('/history', api_controller.history);
router.get('/phrase', api_controller.phrase);
router.post('/colors', api_controller.colors);
router.get('/feed', api_controller.feedlist);
router.post('/show/news', api_controller.showNews);

router.post('/add/phrase', api_controller.addPhrase);
router.post('/add/feed', api_controller.addFeed);

module.exports = router;