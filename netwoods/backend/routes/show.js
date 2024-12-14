const express = require('express');
const router = express.Router();

const showController = require('../controllers/show');

router.get("/:showId/:seasonIdx",showController.getSeason);
router.get("/:showId",showController.getShow);
router.get("",showController.getGenreShow);

module.exports = router;