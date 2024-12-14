const express = require('express');
const trendingController = require('../controllers/trending')

const router = express.Router();

router.get('/',trendingController.getTrending);
router.get('/movies',trendingController.getTrendingMovies);
router.get('/series',trendingController.getTrendingSeries);

module.exports = router;