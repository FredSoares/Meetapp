import { Router } from 'express';

const routes = new Router();

routes.use('/', (req, res) => res.json({ message: 'Hello World!' }));

export default routes;
