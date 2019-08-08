import * as express from 'express';
import { postQuestion, getQuestion, postQuestions, getQuestions } from '../controllers/question.controller';

let router:express.Router = express.Router();
router.post('/', postQuestion);
router.get('/test/:tID', getQuestions);
router.get('/:qID', getQuestion);
router.post('/all', postQuestions);

export const questionRouter = router;