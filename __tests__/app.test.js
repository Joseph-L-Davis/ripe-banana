import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST a new studio', async () => {
    const res = await request(app)
      .post('/api/v1/studios')
      .send({
        name: 'Studio J',
        city: 'New York',
        state: 'New York',
        country: 'USA'
      });

    expect(res.body).toEqual({
      id: 1,
      name: 'Studio J',
      city: 'New York',
      state: 'New York',
      country: 'USA',
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });
  });
});
