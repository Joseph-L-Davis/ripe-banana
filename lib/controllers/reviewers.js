import { Router } from 'express';
import Reviewer from '../models/Reviewer';

export default Router()
  .post('/api/v1/reviewers', (req, res, next) => {
    Reviewer.create(req.body)
      .then(yelper => res.send(yelper))
      .catch(next);
  })

  .get('/api/v1/reviewers/:id', (req, res, next) => {
    Reviewer.findByPk(req.params.id)
      .then(yelper => res.send(yelper))
      .catch(next);
  })

  .get('/api/v1/reviewers', (req, res, next) => {
    Reviewer.findAll()
      .then(yelper => res.send(yelper))
      .catch(next);
  })

  .put('/api/v1/reviewers/:id', (req, res, next) => {
    Reviewer.update(req.body, {
      where: { id: req.params.id },
      returning: true
    })
      .then(([, reviewer]) => res.send(reviewer[0]))
      .catch(next);
  });
