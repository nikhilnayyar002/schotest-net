import * as express from "express";
import * as mongoose from "mongoose";
import {Record404Exception, HttpException} from "../config/global";
import { QuestionOriginal, QuestionModal } from "../modal/question";
import { AnswerModal } from "../modal/answer";

/**
 * Return @message
 */
export const postQuestion: express.RequestHandler = function(req, res, next) {
  let question: QuestionOriginal & mongoose.Document = <any>(
    new QuestionModal(req.body)
  );
  question.save((err, question: QuestionOriginal) => {
    if (!err) res.json({ status: true,  message:"Success" });
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
    if (err) return next(err);
    if (question) res.json({ status: true, question });
    else next(new Record404Exception());
  });
};

/**
 * Return @Questions
 */
export const getQuestions: express.RequestHandler = function(req, res, next) {
  let tID = req.params.tID;
  QuestionModal.find({tID}, (err, questions: QuestionOriginal[]) => {
    if (err) return next(err);
    if (questions && questions.length) res.json({ status: true, questions });
    else next(new Record404Exception());
  })
  /** this sort query is in test and question controllers */
  .sort({ section: 'asc', sectionOrder: 1, _id: 'asc' });
};


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

/**
 * Return @message
 */
export const updateQuestion: express.RequestHandler = function(req, res, next) {
  let question: QuestionOriginal = req.body;
  QuestionModal.updateOne(
    { _id: question._id },
    { ...question },
    function(err, doc) {
      if (err) return next(err);
      if (doc) res.json({ status: true, message: "Success" });
      else next(new HttpException("Failed", 400));
    }
  );
};

/**
 * Return @message
 */
export const delQuestion: express.RequestHandler = function(req, res, next) {
 let proms =[
  QuestionModal.deleteOne({_id:req.params.qID}).exec(),
  AnswerModal.deleteOne({_id:req.params.qID}).exec()
 ]
 Promise.all(proms)
 .then(() => res.json({ status: true, message:"Success" }))
 .catch(()=> res.status(422).json({ status: false, message:"Failed" }))
};

/**
 * Return @message
 */
export const delQuestions: express.RequestHandler = function(req, res, next) {
  let proms = [
    QuestionModal.deleteMany({tID:req.params.tID}).exec(),
    AnswerModal.deleteMany({tID:req.params.tID}).exec()
  ]
  Promise.all(proms)
  .then(() => res.json({ status: true, message:"Success" }))
  .catch(()=> res.status(422).json({ status: false, message:"Failed" }))
};