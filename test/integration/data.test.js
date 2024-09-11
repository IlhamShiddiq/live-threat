const supertest = require('supertest');

const redis = require('./../../app/config/redis.config');
const db = require("../../app/models");
const server = require('../server')
const request = supertest(server);

beforeAll(async () => {
    await db.sequelize.sync();
})

afterAll(async () => {
    await db.sequelize.close();
    await redis.disconnect();
    await server.close();
})

describe('Data Endpoints', () => {

    it('GET /api/data/source-country should show source country data', async () => {
        const res = await request.get('/api/data/source-country');

        expect(res.status).toEqual(200);

        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('data');

        expect(res.body.status).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.message).toEqual('Get data success');
        expect(res.body.data).toHaveProperty('label');
        expect(res.body.data).toHaveProperty('total');
    });

    it('GET /api/data/destination-country should show destination country data', async () => {
        const res = await request.get('/api/data/destination-country');

        expect(res.status).toEqual(200);

        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('data');

        expect(res.body.status).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.message).toEqual('Get data success');
        expect(res.body.data).toHaveProperty('label');
        expect(res.body.data).toHaveProperty('total');
    });

});
