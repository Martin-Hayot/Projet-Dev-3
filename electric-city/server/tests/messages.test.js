const request = require('supertest');
const express = require('express');
const router = require('../routes/messages');
const db = require('../utils/db.server.ts');

// Simule la db
jest.mock('../utils/db.server.ts', () => ({
    messages: {
      create: jest.fn(() => Promise.resolve({ id: 1, email: 'test@email.com', message: 'Ceci est un message de test' })),
    },
}));
  

const app = express();
app.use(express.json());
app.use('/', router);

describe('POST /', () => {
  it('devrait répondre avec du json contenant le nouveau message', async () => {
    const email = 'test@email.com';
    const message = 'Ceci est un message de test';

    const response = await request(app)
      .post('/')
      .send({ email, message });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ id: 1, email: 'test@email.com', message: 'Ceci est un message de test' });


    expect(db.messages.create).toHaveBeenCalledWith({
      data: {
        email: email,
        message: message,
        date: expect.any(String),
      },
    });
  });

  it('devrait répondre avec le statut 500 si quelque chose ne va pas', async () => {
    db.messages.create.mockImplementationOnce(() => {
      throw new Error('Something went wrong');
    });

    const email = 'test@email.com';
    const message = 'Something went wrong';

    const response = await request(app)
      .post('/')
      .send({ email, message });

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      message: 'Something went wrong',
    });
  });
});
