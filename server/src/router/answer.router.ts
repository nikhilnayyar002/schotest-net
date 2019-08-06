import * as express from 'express';
import { postAnswer, getAnswer, getAnswers, postAnswers } from '../controllers/answer.controller';

let router:express.Router = express.Router();
router.post('/', postAnswer);
router.get('/:qID', getAnswer);
router.get('/all/:tID', getAnswers);
router.post('/all', postAnswers);

export const answerRouter = router;