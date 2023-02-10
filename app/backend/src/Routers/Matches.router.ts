import { Router } from 'express';
import ValidateToken from '../middlewares/validateToken';
import MatchesController from '../controllers/Matches.controller';

const validateToken = new ValidateToken();

const router = Router();

router.get('/', MatchesController.getAllMatches);
router.post('/', validateToken.authorization, MatchesController.createNewMatch);
router.patch('/:id/finish', MatchesController.updateMatch);

export default router;
