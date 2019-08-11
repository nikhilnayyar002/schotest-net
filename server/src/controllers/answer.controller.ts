import * as express from "express";
import * as mongoose from "mongoose";
import { Record404Exception, HttpException } from "../config/global";
import { Answer, AnswerModal } from "../modal/answer";

/**
 * Return @Answer
 */
export const postAnswer: express.RequestHandler = function(req, res, next) {
  let answer: Answer & mongoose.Document = <any>new AnswerModal(req.body);
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
  AnswerModal.find({ tID }, (err, answers: Answer[]) => {
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
  AnswerModal.collection.insertMany(req.body, (err, result) => {
    if (!err) res.json({ status: true, message: "Success" });
    else {
      if (err.code) res.status(422).json({ status: false, message: err.code });
      else return next(err);
    }
  });
};

/**
 * Return @message
 */
export const updateAnswer: express.RequestHandler = function(req, res, next) {
  let answer: Answer = req.body;

  AnswerModal.updateOne({ _id: answer._id }, { ...answer }, function(err, doc) {
    if (err) {
      return next(err);
    }
    if (doc) res.json({ status: true, message: "Success" });
    else next(new HttpException("Failed", 400));
  });
};

/**
 * Return @message
 */
export const updateAnswers: express.RequestHandler = function(req, res, next) {
  let answers: Answer[] = req.body;
  let bulkOps = [];

  answers.forEach(answer => {
    bulkOps.push({
      updateOne: {
        filter: { _id: answer._id },
        update: answer,
        upsert: true
      }
    });
  });

  AnswerModal.collection
    .bulkWrite(bulkOps)
    .then(bulkWriteOpResult => {
      res.json({ status: true, message: "Success" });
    })
    .catch(err => {
      res.json({ status: false, message: "Failed" });
    });
};
