import request from 'supertest';
import app from '../lib/app.js';
import sequelize from '../lib/utils/db.js';

describe('demo routes', () => {
  beforeEach(() => {
    return sequelize.sync({ force: true });
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

  it('finds a studio by ID', async () => {
    await request(app)
      .post('/api/v1/studios')
      .send({
        name: 'Studio J',
        city: 'New York',
        state: 'New York',
        country: 'USA'
      });

    const res = await request(app)
      .get('/api/v1/studios/1');

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

  it('get all studios', async () => {
    const J = await request(app)
      .post('/api/v1/studios')
      .send({
        name: 'Studio J',
        city: 'New York',
        state: 'New York',
        country: 'USA'
      });
    const K = await request(app)
      .post('/api/v1/studios')
      .send({
        name: 'Studio K',
        city: 'New York',
        state: 'Kansas',
        country: 'USA'
      });
    
    const A = await request(app)
      .post('/api/v1/studios')
      .send({
        name: 'Studio A',
        city: 'Kansas City',
        state: 'Kansas',
        country: 'USA'
      });

    const res = await request(app)
      .get('/api/v1/studios');

    console.log(res.req.data);

    expect(res.body).toEqual([J, K, A]);
  });
});
