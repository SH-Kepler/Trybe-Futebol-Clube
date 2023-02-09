import { Router } from 'express';
import UserMiddlware from '../middlewares/Users.middleware';
import ValidateToken from '../middlewares/validateToken';
import UsersControler from '../controllers/Users.controller';

const userMiddlware = new UserMiddlware();
const validateToken = new ValidateToken();

const router = Router();

router.get('/validate', validateToken.authorization, UsersControler.getRole);
router.post('/', userMiddlware.emptyEmailOrPassword, UsersControler.login);

export default router;
