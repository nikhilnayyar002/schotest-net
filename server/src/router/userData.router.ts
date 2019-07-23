import * as express from 'express';
import { getUserData, getUserFavourites, postUserFavourites, getUserTests, postUserTest, postUserTestQ, postUserTestT, getUserTest } from '../controllers/userData.controller';

let router:express.Router = express.Router();
router.get('/:userID', getUserData);
router.get('/:userID/favourites', getUserFavourites);
router.post('/:userID/favourites', postUserFavourites);
router.get('/:userID/tests', getUserTests);
router.post('/:userID/tests', postUserTest);
router.get('/:userID/tests/:testID',getUserTest);
router.post('/:userID/tests/q', postUserTestQ);
router.post('/:userID/tests/t', postUserTestT);

export const UserDataRouter = router;