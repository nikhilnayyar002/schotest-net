import * as express from 'express';
import { postQuestion, getQuestion, postQuestions } from '../controllers/question.controller';

let router:express.Router = express.Router();
router.post('/', postQuestion);
router.get('/:qID', getQuestion);
router.post('/all', postQuestions);

export const questionRouter = router;