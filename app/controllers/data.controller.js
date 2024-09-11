const axios = require('axios');
const db = require('../models');
const redis = require('../config/redis.config')

const getAttacks = async () => {
    const t = await db.sequelize.transaction();

    try {
        const response = await axios.get('https://livethreatmap.radware.com/api/map/attacks?limit=10');
        const attacks = response.data;
        let query = 'INSERT INTO "attacks" ("sourcecountry", "destinationcountry", "millisecond", "type", "weight", "attacktime") VALUES ';

        console.log('Storing attacks data...');

        attacks.forEach((attack) => {
            attack.forEach((item) => {
                const {
                    sourceCountry,
                    destinationCountry,
                    millisecond,
                    type,
                    weight,
                    attackTime,
                } = item

                query += `('${sourceCountry}', '${destinationCountry}', ${millisecond}, '${type}', '${weight}', '${attackTime}'),`
            })
        });

        await db.sequelize.query(query.slice(0, -1) + ';', { transaction: t });

        t.commit();
        console.log('Attacks data stored');
    } catch (error) {
        console.error(error);
        t.rollback();
    }
}

const getSourceCountry = async (req, res) => {
    let sources = await redis.get('live_threat.source_country');

    if (!sources) {
        const [ data, _ ] = await db.sequelize.query(`SELECT sourcecountry, COUNT(*) AS count FROM attacks GROUP BY sourcecountry ORDER BY count DESC`);
        await redis.set('live_threat.source_country', JSON.stringify(data), 'EX', 60);

        sources = data;
    } else {
        sources = JSON.parse(sources);
    }

    res.json({
        status: 200,
        success: true,
        message: 'Get data success',
        data: {
            label: sources.map(source => source.sourcecountry),
            total: sources.map(source => parseInt(source.count)),
        }
    });
}

const getDestinationCountry = async (req, res) => {
    let destinations = await redis.get('live_threat.destination_country');

    if (!destinations) {
        const [ data, _ ] = await db.sequelize.query(`SELECT destinationcountry, COUNT(*) AS count FROM attacks GROUP BY destinationcountry ORDER BY count DESC`);
        await redis.set('live_threat.destination_country', JSON.stringify(data), 'EX', 60)

        destinations = data;
    } else {
        destinations = JSON.parse(destinations);
    }

    res.json({
        status: 200,
        success: true,
        message: 'Get data success',
        data: {
            label: destinations.map(source => source.destinationcountry),
            total: destinations.map(source => parseInt(source.count)),
        }
    });
}

module.exports = {
    getAttacks,
    getSourceCountry,
    getDestinationCountry,
}
