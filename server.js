const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const authRouter = require("./app/routes/auth.route");
const dataRouter = require("./app/routes/data.route");
const surveyRouter = require("./app/routes/survey.route");

dotenv.config();
const app = express();

const corsOptions = {
  origin: ["http://localhost:8080"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database Connection
const db = require("./app/models");
db.sequelize.sync();

// Routes
app.use('/api/auth', authRouter)
app.use('/api/data', dataRouter)
app.use('/api/survey', surveyRouter)

const PORT = process.env.APP_PORT || 7878;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
