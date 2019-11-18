import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

/* import auth middleware */
import authMiddleware from './app/middleware/auth';

const routes = new Router();

// route for user creation
routes.post('/users', UserController.store);

// route for session creation
routes.post('/sessions', SessionController.store);

/* apply middleware authentication to all routes below this statement */
routes.use(authMiddleware);

/* route for user update */
routes.put('/users', UserController.update);

export default routes;
