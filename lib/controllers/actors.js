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
  })

  .get('/api/v1/actors', (req, res, next) => {
    Actor.findAll()
      .then(actor => res.send(actor))
      .catch(next);
  })

  .put('/api/v1/actors/:id', (req, res, next) => {
    Actor.update(req.body, {
      where: { id: req.params.id },
      returning: true
    })
      .then(([, actor]) => res.send(actor[0]))
      .catch(next);
  })

  .delete('/api/v1/actors/:id', (req, res, next) => {
    Actor.destroy(req.body, {
      where: { id: req.params.id },
      returning: true,
      truncate: false
    })
      .then(([, actor]) => res.send(actor[0]))
      .catch(next);
  });
// making something to commit


