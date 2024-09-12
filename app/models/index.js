const config = require('../config/db.config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.pg.DB, config.pg.USER, config.pg.PASSWORD, {
  port: config.pg.PORT,
  host: config.pg.HOST,
  dialect: config.pg.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pg.pool.max,
    min: config.pg.pool.min,
    acquire: config.pg.pool.acquire,
    idle: config.pg.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
