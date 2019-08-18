import * as mongoose from "mongoose";
import * as passport from "passport";
import * as express from "express";
import { UserModal, User, UserProfile } from "../modal/user";
import { HttpException } from "../config/global";
import { BackendStatus } from '../../../global/global';

/**
 * Return @message
 */
export const register:express.RequestHandler = (req, res, next) => {

    let user:User & mongoose.Document = <any>new UserModal();
    let userObj:User = req.body
    user.fullName = userObj.fullName;
    user.email = userObj.email;
    user.password = userObj.password;
    user._id = (new Date()).getTime().toString();
    user.favourites = []
    user.tests = {}
    user.save((err, doc:User) => {
        if (!err) res.json({ status:true, message:"success"});
        else {
            if (err.code == 11000)
                res.status(422).json({ status:false, message:'Duplicate email adrress found.'});
            else
                return next(err);
        }
    });
}

/**
 * Return @token
 */
export const authenticate:express.RequestHandler = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user:User, info:BackendStatus) => {       
        // error from passport middleware
        if (err) return res.status(500).json({ status:false, message: 'Please try again later.' });
        // registered user
        else if (user) return res.status(200).json({ status:true, token: user.generateJwt() });
        // unknown user or wrong password
        else return res.status(401).json(info);
    })(req, res);
}

/**
 * Return @UserProfile
 */
export const userProfile:express.RequestHandler = (req, res, next) =>{
    UserModal.findOne({ _id: (<any>req)._id },
        (err, user:User) => {
            if(err) next(new HttpException())
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else {
                let userProfile:UserProfile = { 
                    fullName:user.fullName, email:user.email, id:user._id, favourites:user.favourites,
                    isAdmin:user.isAdmin
                }
                return res.status(200).json({ status: true, user :userProfile });
            }       
        }
    );
}
