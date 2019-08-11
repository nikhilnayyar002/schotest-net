import * as express from 'express';
import { postAnswer, getAnswer, getAnswers, postAnswers, updateAnswers, updateAnswer } from '../controllers/answer.controller';

let router:express.Router = express.Router();
router.post('/', postAnswer); /** Not required bcz "PUT" is there set to insert/update */
router.put('/', updateAnswer);
router.get('/:qID', getAnswer);
router.get('/all/:tID', getAnswers);
router.post('/all', postAnswers);
router.put('/all', updateAnswers);

export const answerRouter = router;