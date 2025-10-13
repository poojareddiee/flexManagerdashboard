const express = require('express');
const router = express.Router();
const { getReviews } = require('../controllers/reviewsController');

router.get('/hostaway', getReviews);

module.exports = router;
