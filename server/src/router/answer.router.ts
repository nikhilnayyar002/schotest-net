import * as express from 'express';
import { getAnswer, getAnswers, postAnswers, updateAnswers, updateAnswer, delAnswers, postAnswer } from '../controllers/answer.controller';
import { checkAdminRoute } from '../config/global';

let router:express.Router = express.Router();

router.post('/', checkAdminRoute, postAnswer); /**  an admin route*/
router.put('/', checkAdminRoute, updateAnswer); /**  an admin route*/
router.get('/all/:tID', getAnswers);
router.get('/:qID', getAnswer);
router.delete('/all/:tID', checkAdminRoute, delAnswers) /** an admin route */
router.post('/all', checkAdminRoute, postAnswers); /**  an admin route*/
router.put('/all', checkAdminRoute, updateAnswers); /**  an admin route*/

export const answerRouter = router;