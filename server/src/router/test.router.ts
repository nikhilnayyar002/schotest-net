import * as express from 'express';
import { getTest, postTest } from '../controllers/test.controller';

let router:express.Router = express.Router();
router.post('/', postTest);
router.get('/:testID', getTest);

export const TestRouter = router;