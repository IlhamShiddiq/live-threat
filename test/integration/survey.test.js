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

describe('Survey Endpoints', () => {
    let jwt;

    it('GET /api/auth/jwt should generate JWT token', async () => {
        const res = await request.post('/api/auth/jwt');

        expect(res.status).toEqual(200);

        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('data');

        expect(res.body.status).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.message).toEqual('Jwt generated successfully');
        expect(res.body.data).toHaveProperty('token');

        jwt = res.body.data.token;
    });

    it('GET /api/survey should show survey', async () => {
        const res = await request.get('/api/survey').set('authorization', `Bearer ${jwt}`);

        expect(res.status).toEqual(200);

        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('message');
        expect(res.body).toHaveProperty('data');

        expect(res.body.status).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.message).toEqual('Get data success');
    });

    it('POST /api/survey should store survey', async () => {
        const res = await request
            .post('/api/survey')
            .set('authorization', `Bearer ${jwt}`)
            .send({
                userId: 3,
                values: [1, 2, 3, 4, 5]
            });

        expect(res.status).toEqual(201);

        expect(res.body).toHaveProperty('status');
        expect(res.body).toHaveProperty('success');
        expect(res.body).toHaveProperty('message');

        expect(res.body.status).toEqual(201);
        expect(res.body.success).toEqual(true);
        expect(res.body.message).toEqual('Store data success');
    });

});
