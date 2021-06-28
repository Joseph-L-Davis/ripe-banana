import request from 'supertest';
import app from '../lib/app.js';
import sequelize from '../lib/utils/db.js';
import Studio from '../lib/models/Studio.js';
import Actor from '../lib/models/Actor.js';
import Reviewer from '../lib/models/Reviewer';

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
    await Studio.bulkCreate(
      [{ 
        name: 'Studio J',
        city: 'New York',
        state: 'New York',
        country: 'USA'
      },
      {
        name: 'Studio K',
        city: 'New York',
        state: 'Kansas',
        country: 'USA'
      },
      {
        name: 'Studio A',
        city: 'Kansas City',
        state: 'Kansas',
        country: 'USA'
      }]
    );

    const res = await request(app)
      .get('/api/v1/studios');



    expect(res.body).toEqual([{ id: 1, name: 'Studio J' }, { id: 2, name: 'Studio K' }, { id: 3, name: 'Studio A' }]);
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
    await Actor.bulkCreate(
      [{
        name: 'Hugh Jackman',
        dob: '1970-01-01T00:00:00.010Z',
        pob: 'Australia'
      },
      {
        name: 'Melissa McCarthy',
        dob:'1988-09-29T00:00:00.000Z',
        pob: 'Illinois'
      }
      ]);
   
    const res = await request(app)
      .get('/api/v1/actors');

    expect(res.body).toEqual([{ id: 1, name: 'Hugh Jackman' }, { id: 2, name: 'Melissa McCarthy' }]);

  });

  it('make a change to actors via PUT', async () => {
    const Melissa = await Actor.create({
      name: 'Melissa McCarthy',
      dob: '1988-09-29T00:00:00.000Z',
      pob: 'Illinois'
    });
   
    const updatedMelissa = await request(app)
      .put('/api/v1/actors/1')
      .send({
        name: 'Melissa McCarthy',
        dob:'1988-09-29T00:00:00.000Z',
        pob: 'Illinois',
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

describe('Reviewer routes', () => {
  beforeEach(() => {
    return sequelize.sync({ force: true });
  });

  it('POST new reviewer', async () => {
    const res = await request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Rude Human',
        company: 'Only The Worst Inc'
      });

    expect(res.body).toEqual({
      name: 'Rude Human',
      company: 'Only The Worst Inc',
      id: 1,
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });
  });

  it('GET reviewer by ID', async () => {
    await request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Rude Human',
        company: 'Only The Worst Inc'
      });

    const res = await request(app)
      .get('/api/v1/reviewers/1');

    expect(res.body).toEqual({
      name: 'Rude Human',
      company: 'Only The Worst Inc',
      id: 1,
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });
  });

  it('GET all reviewers', async () => {
    const dude = await request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Rude Human',
        company: 'Only The Worst Inc'
      });
      
    const dudette = await request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'More Rude Human',
        company: 'Only The Worst Inc'
      });

    const res = await request(app)
      .get('/api/v1/reviewers');

    expect(res.body).toEqual([dude.body, dudette.body]);
  });

  it('update a reviewer via PUT', async () => {
    const karen = await Reviewer.create({
      name: 'kArEn',
      company: 'aRe rEfIlLs fReE? INC'
    });
    
    const updatedKaren = await request(app)
      .put('/api/v1/reviewers/1')
      .send({
        name: 'KAREN',
        company: 'ARE REFILLS FREE? inc'
      });

    expect(updatedKaren.body).toEqual({
      ...karen.toJSON(),
      name: 'KAREN',
      company: 'ARE REFILLS FREE? inc',
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
        
    });

  });

  it('DELETE a stinkin reviewer', async () => {
    const olderKaren = await request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Rude Human',
        company: 'Only The Worst Inc'
      });
    
    const res = await request(app)
      .delete(`/api/v1/reviewers/${olderKaren.id}`);

    expect(res.body).not.toEqual(olderKaren.body);
  });
});
