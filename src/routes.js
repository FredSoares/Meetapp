import { Router } from 'express';

import UserController from './app/controllers/UserController';

const routes = new Router();

// route for user creation
routes.post('/users', UserController.store);


export default routes;
