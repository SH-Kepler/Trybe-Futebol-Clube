import { Router } from 'express';
import MatchesController from '../controllers/Matches.controller';

const router = Router();

router.get('/', MatchesController.getAllMatches);

export default router;
