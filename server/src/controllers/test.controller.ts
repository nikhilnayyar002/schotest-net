import * as express from "express";
import * as mongoose from "mongoose";
import {
  Record404Exception,
  returnTyped,
  simplifyMongoose,
  HttpException
} from "../config/global";
import { TestModal, TestOriginal, TestWithFeatures } from "../modal/test";
import { QuestionModal, QuestionOriginal } from "../modal/question";
import { AnswerModal, Answer } from "../modal/answer";
import { UserModal, User } from "../modal/user";

/**
 * Return @TestWithFeatures
 */
export const getTest: express.RequestHandler = function(req, res, next) {
  let testID = req.params.testID;
  TestModal.findById(testID, function(err, test: TestOriginal) {
    if (err) {
      return next(err);
    }
    if (test)
      QuestionModal.find(
        { tID: test._id },
        (err, questions: QuestionOriginal[]) => {
          if (err) {
            return next(err);
          }
          if (questions && questions.length) {
            test = simplifyMongoose<TestOriginal>(test);
            let testRes: TestWithFeatures = { ...test, questions };
            res.json({ status: true, test: testRes });
          } else next(new Record404Exception());
        }
      ).sort({ section: "asc", sectionOrder: 1, _id: "asc" });
    else next(new Record404Exception());
  });
};

/**
 * Return @string
 */
export const getTestState: express.RequestHandler = function(req, res, next) {
  let testID = req.params.testID;
  TestModal.findById(testID, function(err, test: TestOriginal) {
    if (err) {
      return next(err);
    }
    if (test) {
      /** check if tests are ready */
      let errMessage: string = "";
      if (test.isTestReady)
        res.json({ status: true, test: { name: test.name } });
      else
        res
          .status(400)
          .json({ status: false, message: `${test._id} is not ready yet.` });
    } else next(new Record404Exception());
  });
};

/**
 * Return @message
 */
export const postTest: express.RequestHandler = function(req, res, next) {
  let test: TestOriginal & mongoose.Document = <any>new TestModal(req.body);
  test.save((err, doc: TestOriginal) => {
    if (!err) res.json({ status: true, test: doc });
    else {
      if (err.code) res.status(422).json({ status: false, message: err.code });
      else next(err);
    }
  });
};

/**
 * Return @message
 */
export const updateTest: express.RequestHandler = function(req, res, next) {
  let test: TestOriginal = req.body;

  TestModal.updateOne({ _id: test._id }, { ...test }, function(err, doc) {
    if (err) {
      return next(err);
    }
    if (doc) res.json({ status: true, message: "Success" });
    else next(new HttpException("Failed", 400));
  });
};

/**
 * Return @answers and @questions
 */
export const getQuestionsAnswers: express.RequestHandler = function(
  req,
  res,
  next
) {
  let tID = req.params.testID;

  /** Let us obtain @questions first */
  QuestionModal.find({ tID }, function(err, questions: QuestionOriginal[]) {
    if (err) return next(err);

    if (questions && questions.length) {
      /** Let us obtain @answers first */
      AnswerModal.find({ tID }, (err, answers: Answer[]) => {
        if (err) {
          return next(err);
        }
        if (answers && answers.length)
          res.json({ status: true, answers, questions });
        else next(new Record404Exception());
      });
    } else next(new Record404Exception());
  });
};

/**
 * Return @Questions
 */
export const getTestsByCategory: express.RequestHandler = function(req,res,next) {
  let catID = req.params.catID;
  TestModal.find({ catID }, (err, datas: TestOriginal[]) => {
    if (err) {
      return next(err);
    }
    if (datas && datas.length) {
      let tests = returnTyped<TestWithFeatures[]>(
        simplifyMongoose<TestOriginal[]>(datas)
      );

      /** Find user */
      UserModal.find({ email: req.query.email }, (err, user: User[]) => {
        if (err) {
          return next(err);
        }
        if (user.length && user[0] && user[0].tests) {
          /** Map . Specific operation */
          let docs = tests.map(test => {
            let t = user[0].tests[test._id];
            if (t && (t.time != null || t.time != undefined)) {
              if (test.time != t.time) test.hasTestStarted = true;
              test.time = t.time;
              test.isTestOver = t.isTestOver;
            }
            return test;
          });
          res.json({ status: true, tests: docs });
        } else res.json({ status: true, tests: tests });
      });
    } else next(new Record404Exception());
  });
};
