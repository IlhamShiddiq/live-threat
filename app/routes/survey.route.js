const express = require("express");

const { authMiddleware } = require("./../middleware");
const surveyController = require("./../controllers/survey.controller");

const router = express.Router();

router.get('/', authMiddleware.verifyToken, surveyController.getSurveys);
router.post('/', authMiddleware.verifyToken, surveyController.storeSurvey);

module.exports = router;