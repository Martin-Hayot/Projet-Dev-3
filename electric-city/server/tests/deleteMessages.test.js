const request = require('supertest');
const express = require('express');
const router = require('../routes/deleteMessages');

jest.mock('../utils/db.server.ts', () => {
    const mockDelete = jest.fn();
    return {
        Messages: {
            delete: mockDelete,
        },
    };
});

const db = require("../utils/db.server.ts");

const app = express()
app.use(express.json())
app.use('/', router)

describe('PUT /', () => {
    it("retourne 400 si l'id est pas la", async () => {
        const res = await request(app).put('/').send({})
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('error', "il manque l'id")
    })

    it("doit retournée 400 si aucun message trouvé avec l'id", async () => {
        db.Messages.delete.mockResolvedValue(0)

        const res = await request(app).put('/').send({id: '123'})
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('error', 'aucun message avec cette id')
    })

    it('retourne 200 si message bien supprimé', async () => {
        db.Messages.delete.mockResolvedValue(1)

        const res = await request(app).put('/').send({id: '123'})
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('ok', 'nickel')
    })

    it('retourne 500 si erreur du serveur', async () => {
        db.Messages.delete.mockRejectedValue(new Error('erreur 500')) 

        const res = await request(app).put('/').send({id: '123'})
        expect(res.statusCode).toEqual(500)
        expect(res.body).toHaveProperty('message', 'erreur 500')
    })
})
