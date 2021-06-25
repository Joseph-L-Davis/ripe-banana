import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import studioController from './controllers/studios';
import actorController from './controllers/actors';

const app = express();

app.use(express.json());
app.use(studioController);
app.use(actorController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
