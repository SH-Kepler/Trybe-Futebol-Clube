import { Router } from 'express';
import UserMiddlware from '../middlewares/Users.middleware';
import UsersControler from '../controllers/Users.controller';

const usersController = new UsersControler();
const userMiddlware = new UserMiddlware();

const router = Router();

router.post('/', userMiddlware.emptyEmailOrPassword, usersController.login);

export default router;
