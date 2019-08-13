import * as express from 'express';
import { postQuestion, getQuestion, postQuestions, getQuestions, updateQuestion, delQuestion, delQuestions } from '../controllers/question.controller';

let router:express.Router = express.Router();
router.post('/', postQuestion);
router.put('/', updateQuestion);
router.get('/test/:tID', getQuestions);
router.get('/:qID', getQuestion);
router.delete('/:qID', delQuestion);
router.delete('/all/:tID', delQuestions)
router.post('/all', postQuestions);

export const questionRouter = router;