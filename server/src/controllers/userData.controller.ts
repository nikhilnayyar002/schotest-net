import * as express from "express";
import { Record404Exception, HttpException } from "../config/global";
import { UserModal, User } from "../modal/user";

export const getUserData:express.RequestHandler = (req,res,next) =>{
    let id=req.params.userID;
    UserModal.findById(id,function (err, user:User) {
        if (err) { return next(err); }
        if(user)  res.json({ status:true, user:{favourites:user.favourites, tests:user.tests}});
        else next(new Record404Exception())
    })
}

export const getUserFavourites:express.RequestHandler = (req,res,next)=>{
    let id=req.params.userID;
    UserModal.findById(id,function (err, user:User) {
        if (err) { return next(err); }
        if(user)  res.json({ status:true, favourites:user.favourites});
        else next(new Record404Exception())
    })
}

/**
 * Send @id in body
 */
export const postUserFavourites:express.RequestHandler = (req,res,next)=>{
    let id=req.params.userID;

    UserModal.updateOne(
        { "_id": id },
        { "$push": { "favourites": req.body.id }},
        function (err, doc) {
            if (err) { return next(err); }
            if(doc) res.json({status:true, message:"Success"});
            else next(new HttpException('Failed',400))          
        }
    )
};

export const getUserTests:express.RequestHandler = (req,res,next)=>{
    let id=req.params.userID;

    UserModal.findById(id,function (err, user:User) {
        if (err) { return next(err); }
        if(user) return res.json({status:true, tests:user.tests});
        else next(new Record404Exception())  
    })
};

export const getUserTest:express.RequestHandler = (req,res,next) =>{
    let id=req.params.userID, tID=req.params.testID;
    UserModal.findById(id,function (err, user:User) {
        console.log(user)
        if (err) { return next(err); }
        if(user) {
            if(user.tests && user.tests[tID]) 
                return res.json({status:true, test:user.tests[tID]});
            else 
                return res.json({status:true, test:null});                
        }
        else next(new Record404Exception())
    })
}

export const postUserTest:express.RequestHandler = (req,res,next) =>{
    let id=req.params.userID
    let newObj = {}
    newObj[`tests.${req.body._id}`] = req.body
    UserModal.updateOne(
        { "_id": id },
        { "$set": newObj},
        function (err, doc) {
            if (err) { return next(err); }
            if(doc) res.json({status:true, message:"Success"});
            else next(new HttpException('Failed',400))
        }
    )
}

export const postUserTestQ:express.RequestHandler = (req,res,next) =>{
    let id=req.params.userID, tID=req.body.id
    UserModal.findById(id, function(err, user:User){
        if (err) { return next(err); }
        if (user) {
            let newObj = {}, keyName = Object.keys(req.body.question)[0];
            newObj[`tests.${tID}.questions.${keyName}`] = req.body.question[keyName]
            UserModal.updateOne(
                { "_id": id },
                { "$set": newObj},
                function (err, doc) {
                    if (err) { return next(err); }
                    if(doc) res.json({status:true, message:"Success"});
                    else next(new HttpException('Failed',400))
                }
            )
        }
        else  next(new Record404Exception())
    });
}

export const postUserTestT:express.RequestHandler = (req,res,next) =>{
    let id=req.params.userID, tID=req.body.id
    UserModal.findById(id, function(err, user:User){
        if (err) { return next(err); }
        if (user) {
            let newObj = {}
            newObj[`tests.${tID}.time`] = req.body.time
            UserModal.updateOne(
                { "_id": id },
                { "$set": newObj},
                function (err, doc) {
                    if (err) { return next(err); }
                    if(doc) res.json({status:true, message:"Success"});
                    else next(new HttpException('Failed',400))
                }
            )
        }
        else  next(new Record404Exception())
    });
}


