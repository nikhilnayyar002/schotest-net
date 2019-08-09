import * as express from 'express';
import { getTest, postTest, getQuestionsAnswers, getTestState, updateTest } from '../controllers/test.controller';

let router:express.Router = express.Router();
router.post('/', postTest);
router.put('/', updateTest);
router.get('/:testID', getTest);
router.get('/:testID/state', getTestState);
router.get('/:testID/completed', getQuestionsAnswers);

export const TestRouter = router;