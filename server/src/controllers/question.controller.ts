import * as express from "express";
import * as mongoose from "mongoose";
import {Record404Exception} from "../config/global";
import { QuestionOriginal, QuestionModal } from "../modal/question";

/**
 * Return @Question
 */
export const postQuestion: express.RequestHandler = function(req, res, next) {
  let question: QuestionOriginal & mongoose.Document = <any>(
    new QuestionModal(req.body)
  );
  question.save((err, question: QuestionOriginal) => {
    if (!err) res.json({ status: true, question });
    else {
      if (err.code) res.status(422).json({ status: false, message: err.code });
      else return next(err);
    }
  });
};

/**
 * Return @Question
 */
export const getQuestion: express.RequestHandler = function(req, res, next) {
  let id = req.params.qID;
  QuestionModal.findById(id, (err, question: QuestionOriginal) => {
    if (err) {
      return next(err);
    }
    if (question) res.json({ status: true, question });
    else next(new Record404Exception());
  });
};

// /**
//  * Return @Questions
//  */
// export const getQuestions: express.RequestHandler = function(req, res, next) {
//   let tID = req.params.tID;
//   QuestionModal.find({tID}, (err, questions: Question[]) => {
//     if (err) {
//       return next(err);
//     }
//     if (questions && questions.length) res.json({ status: true, questions });
//     else next(new Record404Exception());
//   });
// };


/**
 * Return @message
 */
export const postQuestions: express.RequestHandler = function(req, res, next) {

  QuestionModal.collection.insertMany(req.body, (err, result)=>{
    if (!err) res.json({ status: true, message:"Success" });
    else {
      if (err.code) res.status(422).json({ status: false, message: err.code });
      else return next(err);
    }
  })

};
