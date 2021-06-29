import { Router } from 'express';
import Film from '../models/Film';
import Studio from '../models/Studio';

export default Router()
  .post('/api/v1/films', (req, res, next) => {
    Film.create(req.body)
      .then(actor => res.send(actor))
      .catch(next);
  })

  .get('/api/v1/films', (req, res, next) => {
    Film.findAll({
      include:{
        model: Studio,
        attributes: [{ film: ['id', 'title', 'released'], studio: ['id', 'name'] }]
      } })
      .then(film => res.send(film))
      .catch(next);
  }
  );



