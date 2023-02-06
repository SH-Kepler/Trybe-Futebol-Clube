import { Router } from 'express';
import UserMiddlware from '../middlewares/Users.middleware';
import UsersControler from '../controllers/Users.controller';
import TeamsController from '../controllers/Teams.controller';

const userMiddlware = new UserMiddlware();

const router = Router();

router.post('/', userMiddlware.emptyEmailOrPassword, UsersControler.login);
router.get('/', TeamsController.getAllTeams);

export default router;
