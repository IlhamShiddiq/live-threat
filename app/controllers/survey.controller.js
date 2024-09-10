const db = require('../models');

// 'refactoreMe1' function
const getSurveys = async (req, res) => {
    try {
        let total = [0, 0, 0, 0, 0];
        const [ surveys, _ ] = await db.sequelize.query(`select values from "surveys"`);

        // Get sum of the values index
        surveys.forEach((survey) => {
            survey.values.forEach((value, index) => {
                total[index] += value;
            })
        })

        // Calculate total
        total = total.map((value) => value / 10)

        res.json({
            status: 200,
            success: true,
            message: 'Get data success',
            data: total
        })
    } catch (e) {
        console.log(e)
        res.json({
            status: 500,
            success: false,
            message: 'Internal server error',
        })
    }
}

// 'refactoreMe2' function
const storeSurvey = async (req, res) => {
    const t = await db.sequelize.transaction();

    try {
        const { userId, values } = req.body;

        // Insert data into "surveys" table
        await db.sequelize.query(`
          INSERT INTO "surveys" ("values", "createdAt", "updatedAt", "userId")
          VALUES (ARRAY[:values], now(), now(), :userId)
        `, {
            transaction: t,
            replacements: {
                values,
                userId
            }
        });

        // Update "users" table
        await db.sequelize.query(`UPDATE "users" SET "dosurvey" = :doSurvey WHERE "id" = :userId`, {
            transaction: t,
            replacements: {
                doSurvey: true,
                userId
            }
        });

        t.commit();

        res.status(201).json({
            status: 201,
            success: true,
            message: 'Store data success',
        });
    } catch (e) {
        t.rollback();
        console.error(e)
        res.json({
            status: 500,
            success: false,
            message: 'Internal server error',
        })
    }
}

module.exports = {
    getSurveys,storeSurvey,
}
