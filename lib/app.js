import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';

import studioController from './controllers/studios';
import actorController from './controllers/actors';
import reviewerController from './controllers/reviewers';
import filmController from './controllers/films';

import './models';
const app = express();

app.use(express.json());
app.use(studioController);
app.use(actorController);
app.use(reviewerController);
app.use(filmController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
