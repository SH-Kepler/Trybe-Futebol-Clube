import { Router } from 'express';
import UserMiddlware from '../middlewares/Users.middleware';
import UsersControler from '../controllers/Users.controller';

const userMiddlware = new UserMiddlware();

const router = Router();

router.post('/', userMiddlware.emptyEmailOrPassword, UsersControler.login);

export default router;
