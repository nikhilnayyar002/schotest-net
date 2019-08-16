import * as express from 'express';
import { postQuestion, getQuestion, postQuestions, getQuestions, updateQuestion, delQuestion, delQuestions } from '../controllers/question.controller';
import { checkAdminRoute } from '../config/global';

let router:express.Router = express.Router();
router.post('/', checkAdminRoute, postQuestion); /** an admin route */
router.put('/', checkAdminRoute, updateQuestion); /** an admin route */
router.get('/test/:tID', getQuestions);
router.get('/:qID', getQuestion);
router.delete('/:qID', checkAdminRoute, delQuestion); /** an admin route */
router.delete('/all/:tID', checkAdminRoute, delQuestions) /** an admin route */
router.post('/all', checkAdminRoute, postQuestions); /** an admin route */

export const questionRouter = router;