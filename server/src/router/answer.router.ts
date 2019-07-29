import * as express from 'express';
import { postAnswers, getAnswer } from '../controllers/answer.controller';

let router:express.Router = express.Router();
router.post('/', postAnswers);
router.get('/:testID', getAnswer);


export const answerRouter = router;