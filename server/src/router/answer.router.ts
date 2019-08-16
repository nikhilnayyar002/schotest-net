import * as express from 'express';
import { getAnswer, getAnswers, postAnswers, updateAnswers, updateAnswer } from '../controllers/answer.controller';
import { checkAdminRoute } from '../config/global';

let router:express.Router = express.Router();


/** Not required bcz "PUT" is there set to insert/update */
// router.post('/', checkAdminRoute, postAnswer); 

router.put('/', checkAdminRoute, updateAnswer); /**  an admin route*/
router.get('/:qID', getAnswer);
router.get('/all/:tID', getAnswers);
router.post('/all', checkAdminRoute, postAnswers); /**  an admin route*/
router.put('/all', checkAdminRoute, updateAnswers); /**  an admin route*/

export const answerRouter = router;