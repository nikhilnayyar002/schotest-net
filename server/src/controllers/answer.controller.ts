import * as express from "express";
import * as mongoose from "mongoose";
import {Record404Exception} from "../config/global";
import { Answer, AnswerModal } from "../modal/answer";

/**
 * Return @Answer
 */
export const postAnswer: express.RequestHandler = function(req, res, next) {
  let answer: Answer & mongoose.Document = <any>(
    new AnswerModal(req.body)
  );
  answer.save((err, doc: Answer) => {
    if (!err) res.json({ status: true, answer: doc });
    else {
      if (err.code) res.status(422).json({ status: false, message: err.code });
      else return next(err);
    }
  });
};

/**
 * Return @Answer
 */
export const getAnswer: express.RequestHandler = function(req, res, next) {
  let id = req.params.qID;
  AnswerModal.findById(id, (err, answer: Answer) => {
    if (err) {
      return next(err);
    }
    if (answer) res.json({ status: true, answer });
    else next(new Record404Exception());
  });
};

/**
 * Return @Answers
 */
export const getAnswers: express.RequestHandler = function(req, res, next) {
  let tID = req.params.tID;
  AnswerModal.find({tID}, (err, answers: Answer[]) => {
    if (err) {
      return next(err);
    }
    if (answers && answers.length) res.json({ status: true, answers });
    else next(new Record404Exception());
  });
};


/**
 * Return @AnswersForTest
 */
export const postAnswers: express.RequestHandler = function(req, res, next) {

  AnswerModal.collection.insertMany(req.body, (err, result)=>{
    if (!err) res.json({ status: true, message:"Success" });
    else {
      if (err.code) res.status(422).json({ status: false, message: err.code });
      else return next(err);
    }
  })

};
