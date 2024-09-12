const express = require('express');
const router = express.Router();

const dataController = require('./../controllers/data.controller');

router.get('/source-country', dataController.getSourceCountry);
router.get('/destination-country', dataController.getDestinationCountry);

module.exports = router;