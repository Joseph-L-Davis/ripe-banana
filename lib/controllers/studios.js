import { Router } from 'express';
import Studio from '../models/Studio';

export default Router()
  .post('/api/v1/studios', (req, res, next) => {
    Studio.create(req.body)
      .then(studio => res.send(studio))
      .catch(next);
  })
  
  .get('/api/v1/studios/:id', (req, res, next) => {
    Studio.findByPk(req.params.id)
      .then(studio => res.send(studio))
      .catch(next);
  })
  
  .get('/api/v1/studios', (req, res, next) => {
    Studio.findAll({
      attributes: ['id', 'name', 'city', 'state', 'country', 'updatedAt', 'createdAt']
    })
      .then(studio => res.send(studio))
      .catch(next);
  })

  .put('/api/v1/studios/:id', (req, res, next) => {
    Studio.update(req.body, {
      where: { id: req.params.id },
      returning: true
    })
      .then(([, studio]) => res.send(studio[0]))
      .catch(next);
      
  });
