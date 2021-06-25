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
  });
