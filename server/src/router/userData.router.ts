import * as express from 'express';
import { getUserData, getUserFavourites, postUserFavourites, getUserTests, postUserTestQ, postUserTestT, getUserTest, getPausedTests, getCompletedTests, delUserFavourites } from '../controllers/userData.controller';
import { UserModal, User } from '../modal/user';
import { HttpException } from '../config/global';

let router:express.Router = express.Router();

router.all("*",(req,res,next)=>{
    let userID = req.params.userID
    UserModal.findById((<any>req)._id,(err,user:User)=>{
        if(err) next(new HttpException())
        if (!user)
            return res.status(404).json({ status: false, message: 'User record not found.' });
        else if(user._id ! = userID) 
            return res.status(403).send({ status: false, message: "Acess Forbidden. Invalid User Acess."});
        else next();
    })
})

router.get('/:userID', getUserData);
router.get('/:userID/favourites', getUserFavourites);
router.post('/:userID/favourites', postUserFavourites);
router.post('/:userID/favourites/delete', delUserFavourites);
router.get('/:userID/tests/', getUserTests);
router.post('/:userID/tests/q', postUserTestQ);
router.post('/:userID/tests/t', postUserTestT);
router.get('/:userID/tests/paused',getPausedTests);
router.get('/:userID/tests/completed', getCompletedTests);
router.get('/:userID/tests/:testID',getUserTest);


export const UserDataRouter = router;
