import { Router } from 'express';
import { CreateUserController } from './controllers/CreateUserController';
import { UserController } from './controllers/UserController';

const router = Router();

router.post('/users', new CreateUserController().handle)
router.post('/users', new UserController().handle)

export { router };