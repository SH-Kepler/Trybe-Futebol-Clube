import { Router } from 'express';
import ValidateToken from '../middlewares/validateToken';
import MatchesController from '../controllers/Matches.controller';
import MatchMiddleware from '../middlewares/Matches.middleware';

const validateToken = new ValidateToken();
const matchMiddleware = new MatchMiddleware();

const router = Router();

router.get('/', MatchesController.getAllMatches);
router.post(
  '/',
  matchMiddleware.notEqualTeams,
  validateToken.authorization,
  MatchesController.createNewMatch,
);
router.patch('/:id/finish', MatchesController.updateMatch);
router.patch('/:id', MatchesController.updateMatchInProgress);

export default router;
