import request from 'supertest';
import app from '../lib/app.js';
import sequelize from '../lib/utils/db.js';
import Studio from '../lib/models/Studio.js';

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



    expect(res.body).toEqual([J.body, K.body, A.body]);
  });

  it('make a change to a studio PUT', async () => {
    const A = await Studio.create({         
      name: 'Studio A',
      city: 'seattle',
      state: 'washington',
      country: 'USA' 
    });
    
    
    const updatedA = await request(app)
      .put('/api/v1/studios/1')
      .send({
        name: 'Studio A',
        city: 'Kansas City',
        state: 'Kansas',
        country: 'USA'
      });

    expect(updatedA.body).toEqual({
      ...A.toJSON(),
      name: 'Studio A',
      city: 'Kansas City',
      state: 'Kansas',
      country: 'USA',
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });
  });

  it('DELETE a studio by ID', async () => {
    const studioJ = await request(app)
      .post('/api/v1/studios')
      .send({
        name: 'Studio J',
        city: 'New York',
        state: 'New York',
        country: 'USA'
      });
    console.log(studioJ.body);

    const res = await Studio.destroy(studioJ.body, {
      where: {
        id: 1
      }
    });
    request(app)
      .delete(`/api/v1/studios/${studioJ.id}`);

    expect(res.body).toEqual(studioJ.body);

  });
});
