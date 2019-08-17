import * as express from 'express';
import { getTest, postTest, getQuestionsAnswers, getTestState, updateTest, getTestsByCategory, getTests, getTestsCount, delTest, findTests, getTestsByCategoryCount, findTestsForUser } from '../controllers/test.controller';
import { checkAdminRoute } from '../config/global';

let router:express.Router = express.Router();
router.post('/', checkAdminRoute, postTest); /** an admin route */
router.put('/', checkAdminRoute, updateTest); /** an admin route */
router.post('/find', findTests);
router.post('/find/foruser', findTestsForUser);
router.get('/count', getTestsCount);
router.get('/category/:catID/count',getTestsByCategoryCount)
router.get('/category/:catID/:pNo',getTestsByCategory)
router.get('/all/:pNo', getTests);
router.get('/:testID', getTest);
router.get('/:testID/state', getTestState);
router.get('/:testID/completed', getQuestionsAnswers);
router.delete('/:tID', checkAdminRoute, delTest); /** an admin route */

export const TestRouter = router;