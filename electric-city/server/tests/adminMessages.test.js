const request = require('supertest');
const express = require('express');
const router = require('../routes/adminMessages');

jest.mock('../utils/db.server.ts', () => {
    const mockFindMany = jest.fn();
    return {
        messages: {
            findMany: mockFindMany,
        },
    };
});

const db = require("../utils/db.server.ts");

const app = express()
app.use(express.json())
app.use('/', router)

describe('GET /', () => {
    it('retourne 200 + array de messages si tout va bien', async () => {
        const mockMessages = [{id: '1', message: 'Test 1'}, {id: '2', message: 'Test 2'}];
        db.messages.findMany.mockResolvedValue(mockMessages);

        const res = await request(app).get('/')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(mockMessages)
    })

    it('retourne 500 si erreur du server', async () => {
        db.messages.findMany.mockRejectedValue(new Error('Something went wrong'))

        const res = await request(app).get('/')
        expect(res.statusCode).toEqual(500)
        expect(res.body).toHaveProperty('message', 'Something went wrong')
    })
})
