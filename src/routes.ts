import { Router } from 'express';
import { CreateUserController } from './controllers/user/CreateUserController';
import { UserController } from './controllers/user/UserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

router.post('/session', new AuthUserController().hadle)

router.post('/users', new CreateUserController().handle)

router.post('/users', new UserController().handle)

router.get('/me', isAuthenticated,  new DetailUserController().handle)

export { router };