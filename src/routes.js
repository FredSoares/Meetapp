import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

// route for user creation
routes.post('/users', UserController.store);

// route for session creation
routes.post('/sessions', SessionController.store);


export default routes;
