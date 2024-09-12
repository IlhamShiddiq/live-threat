const express = require('express');
const router = express.Router();

const { authMiddleware } = require('./../middleware');
const surveyController = require('./../controllers/survey.controller');

router.get('/', authMiddleware.verifyToken, surveyController.getSurveys);
router.post('/', authMiddleware.verifyToken, surveyController.storeSurvey);

module.exports = router;