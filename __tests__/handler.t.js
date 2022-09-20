import request from 'supertest';
import express from 'express';
import router from '../server/index.js';

const app = new express();
app.use('/get-all-todo', router);

describe('Test Handlers', function() {
    
    test('responds to /get-all-todo', async () => {
        const res = await request(app).get('/get-all-todo?pageNumber=1&pageSize=10');
        expect(res.status).toBe(200);
        expect(res.message).toEqual('Successfully retrieved!');
    });
});