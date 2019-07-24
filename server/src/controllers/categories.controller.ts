import * as express from "express";
import * as mongoose from "mongoose";
import { CategoryModal, Category } from "../modal/category";
import { Record404Exception, HttpException } from "../config/global";
import { TestModal, Test } from "../modal/test";
import { UserModal, User } from "../modal/user";


export const postCategory:express.RequestHandler = function(req, res, next) {
    let test:Category & mongoose.Document = <any>new CategoryModal(req.body);
    test.save((err,doc:Category)=>{
      if (!err)
        res.json({ status:true, category:doc});
      else {
        if (err.code) res.status(422).json({ status:false, message:err.code});
        else return next(err);
      }
    })
  }

export const getCategories:express.RequestHandler = (req,res,next) =>{
    CategoryModal.find({},function (err, categories:Category[]) {
        if (err) { return next(err); }
        if(categories) res.json({ status:true, categories:categories })
        else next(new Record404Exception())
      })
}

export const getCategory:express.RequestHandler = function(req, res, next) {
  let categoryID=req.params.categoryID;
  CategoryModal.findById(categoryID, (err, category:Category)=>{
    if (err) { return next(err); }
    if(category) res.json({status:true, category})
    else next(new Record404Exception())
  })
}

/**
 * Return @tests_list without questions
 * requires @par categoryID and @query email
 */
export const getCategoryTests:express.RequestHandler = (req,res,next) =>{
    let categoryID=req.params.categoryID;
    CategoryModal.findById(categoryID, (err, category:Category)=>{
        if (err) { return next(err); }
        if(category) {
            let proms=[]
            for(let t of category.tests) proms.push(TestModal.findById(t).exec())
            Promise.all(proms).then((tests:Test[])=>{
                if(tests.length) {
                  tests = tests.map(test=>{
                    test.questions = <any>Object.keys(test.questions).length
                    test.sections = <any>Object.keys(test.sections).length
                    return test
                  })
                    UserModal.find({email:req.query.email}, (err, user:User[])=>{
                        if (err) { return next(err); }
                        if(user.length && user[0] && user[0].tests) {
                            let docs = tests.map((test)=>{
                              let t=user[0].tests[test._id]
                              if(t && t.time) test.time = t.time
                              return test
                            })
                            res.json({ status:true, tests:docs})
                        }
                        else res.json({ status:true, tests:tests})
                    })
                }
                else next(new Record404Exception())
            }).catch(err => next(new HttpException('Please try again later.')))
        }
        else next(new Record404Exception())
    })
};

