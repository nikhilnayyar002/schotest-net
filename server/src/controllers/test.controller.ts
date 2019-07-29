import * as express from "express";
import * as mongoose from "mongoose";

import { Record404Exception, simplifyMongoose, returnTyped } from "../config/global";
import { TestModal, TestOriginal } from "../modal/test";
import { AnswersForTestModal, AnswersForTest } from "../modal/answer";

/**
 * Return @TestOriginal
 */
export const getTest:express.RequestHandler = function(req, res, next) {
    let testID=req.params.testID;
    TestModal.findById(testID,function (err, test:TestOriginal) {
      if (err) { return next(err); }
      if(test)res.json({status:true, test})
      else next(new Record404Exception())
    })
}

/**
 * Return @message
 */
export const postTest:express.RequestHandler = function(req, res, next) {
  let test:TestOriginal & mongoose.Document = <any>new TestModal(req.body);
  test.save((err,doc:TestOriginal)=>{
    if (!err)
      res.json({ status:true, test:doc});
    else {
      if (err.code) res.status(422).json({ status:false, message:err.code});
      else next(err);
    }
  })
}

/**
 * Return @answers and @questions
 */
export const getQuestionsAnswers:express.RequestHandler = function(req, res, next) {
  let testID=req.params.testID;
  TestModal.findById(testID,function (err, test:TestOriginal) {
    if (err) { return next(err); }
    if(test) {
      let questions = test.questions

      AnswersForTestModal.findById(testID, (err, answersForTest: AnswersForTest) => {
        if (err) {
          return next(err);
        }
        if (answersForTest) res.json({ status: true, answers:answersForTest.answers, questions });
        else next(new Record404Exception());
      });
      
    }
    else next(new Record404Exception())
  })
}