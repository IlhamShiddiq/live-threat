const Redis = require('ioredis');
const config = require('./db.config')

const redis = new Redis({
    port: config.redis.PORT,
    host: config.redis.HOST,
    password: config.redis.PASSWORD
})

module.exports = redis;
