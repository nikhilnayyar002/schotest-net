import * as express from 'express';
import { getTest, postTest, getQuestionsAnswers, getTestState, updateTest, getTestsByCategory, getTests, getTestsCount, delTest, findTests, getTestsByCategoryCount } from '../controllers/test.controller';

let router:express.Router = express.Router();
router.post('/', postTest);
router.put('/', updateTest);
router.post('/find', findTests);
router.get('/count', getTestsCount);
router.get('/category/:catID/count',getTestsByCategoryCount)
router.get('/category/:catID/:pNo',getTestsByCategory)
router.get('/all/:pNo', getTests);
router.get('/:testID', getTest);
router.get('/:testID/state', getTestState);
router.get('/:testID/completed', getQuestionsAnswers);
router.delete('/:tID', delTest);

export const TestRouter = router;