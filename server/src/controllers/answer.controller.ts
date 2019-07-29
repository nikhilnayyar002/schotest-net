import * as express from "express";
import * as mongoose from "mongoose";
import {
  Record404Exception
} from "../config/global";
import { AnswersForTest, AnswersForTestModal } from "../modal/answer";

/**
 * Return @AnswersForTest
 */
export const postAnswers: express.RequestHandler = function(req, res, next) {
  let answersForTest: AnswersForTest & mongoose.Document = <any>(
    new AnswersForTestModal(req.body)
  );
  answersForTest.save((err, doc: AnswersForTest) => {
    if (!err) res.json({ status: true, answersForTest: doc });
    else {
      if (err.code) res.status(422).json({ status: false, message: err.code });
      else return next(err);
    }
  });
};

export const getAnswer: express.RequestHandler = function(req, res, next) {
  let testID = req.params.testID;
  AnswersForTestModal.findById(testID, (err, answersForTest: AnswersForTest) => {
    if (err) {
      return next(err);
    }
    if (answersForTest) res.json({ status: true, answersForTest });
    else next(new Record404Exception());
  });
};
