import { Router } from 'express';
import Reviewer from '../models/Reviewer';

export default Router()
  .post('/api/v1/reviewers', (req, res, next) => {
    Reviewer.create(req.body)
      .then(yelper => res.send(yelper))
      .catch(next);
  });
