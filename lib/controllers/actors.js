import { Router } from 'express';
import Actor from '../models/Actor';

export default Router()
  .post('/api/v1/actors', (req, res, next) => {
    Actor.create(req.body)
      .then(actor => res.send(actor))
      .catch(next);
  })

  .get('/api/v1/actors/:id', (req, res, next) => {
    Actor.findByPk(req.params.id)
      .then(actor => res.send(actor))
      .catch(next);
  });
