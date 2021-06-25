import request from 'supertest';
import app from '../lib/app.js';
import sequelize from '../lib/utils/db.js';
import Studio from '../lib/models/Studio.js';
import Actor from '../lib/models/Actor.js';

describe('Studio routes', () => {
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
    
    const res = await request(app)
      .delete(`/api/v1/studios/${studioJ.id}`);

    expect(res.body).not.toEqual(studioJ.body);

  });
});

describe('Actor routes', () => {
  beforeEach(() => {
    return sequelize.sync({ force: true });
  });

  it('POST new Actor', async () => {
    const res = await request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Jimmy dean',
        dob: '1988-09-29T00:00:00.000Z',
        pob: 'Portland'
      });

    expect(res.body).toEqual({
      id: 1,
      name: 'Jimmy dean',
      dob: '1988-09-29T00:00:00.000Z',
      pob: 'Portland',
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });
  });

  it('finds actor by id via GET', async () => {
    await request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Jimmy dean',
        dob: '1988-09-29T00:00:00.000Z',
        pob: 'Portland'
      });

    const res = await request(app) 
      .get('/api/v1/actors/1');

    expect(res.body).toEqual({
      id: 1, 
      name: 'Jimmy dean',
      dob: '1988-09-29T00:00:00.000Z',
      pob: 'Portland',
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });
  });

  it('finds all actors via GET', async () => {
    const Hugh = await request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Hugh Jackman',
        dob: 10,
        pob: 'Australia'
      });
   
    const res = await request(app)
      .get('/api/v1/actors/1');

    expect(res.body).toEqual(Hugh.body);

  });

  it('make a change to actors via PUT', async () => {
    const Melissa = await Actor.create({
      name: 'Melissa McCarthy',
      dob:'1988-09-29T00:00:00.000Z',
      pob: 'Illinois'
    });
   
    const updatedMelissa = await request(app)
      .put('/api/v1/actors/1')
      .send({
        name: 'Melissa McCarthy',
        dob:'1988-09-29T00:00:00.000Z',
        pob: 'New York',
        updatedAt: expect.any(String),
        createdAt: expect.any(String)
      });
     
    expect(updatedMelissa.body).toEqual({
      ...Melissa.toJSON(),
      name: 'Melissa McCarthy',
      dob:'1988-09-29T00:00:00.000Z',
      pob: 'Illinois',
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });
  });

  it('DELETE an actor by ID', async () => {
    const Lauren = await request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Lauren Graham',
        dob: 1969 - 12 - 31,
        pob: 'Hawaii'
      });

    const res = await request(app)
      .delete(`/api/v1/actors/${Lauren}`);

    expect(res.body).not.toEqual(Lauren.body);
  });

});
