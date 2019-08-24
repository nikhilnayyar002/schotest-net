import * as express from "express";
import * as mongoose from "mongoose";
import {
  Record404Exception,
  simplifyMongoose,
  HttpException
} from "../config/global";
import { TestModal, TestOriginal, TestWithFeatures } from "../modal/test";
import { QuestionModal, QuestionOriginal } from "../modal/question";
import { AnswerModal, Answer } from "../modal/answer";

import { globalEnvironment } from "../../../config/global.config";
import { CategoryModal, Category } from "../modal/category";
let config:globalEnvironment = require("../../../config/config.json")

/**
 * Return @TestWithFeatures | @TestOriginal
 */
export const getTest: express.RequestHandler = function(req, res, next) {
  let testID = req.params.testID;
  TestModal.findById(testID, function(err, test: TestOriginal) {
    if (err) return next(err);
    if (test) {
      QuestionModal.find(
        { tID: test._id },
        (err, questions: QuestionOriginal[]) => {
          if (err) return next(err);
          if (questions && questions.length) {
            test = simplifyMongoose<TestOriginal>(test);
            let testRes: TestWithFeatures = { ...test, questions };
            return res.json({ status: true, test: testRes });
          }
          else return res.json({ status: true, test });
        }
      )
      /** this sort query is in test and question controllers */
      .sort({ sectionOrder: 1,  section: 'asc', _id: 'asc'  });
    }
    else return next(new Record404Exception());
  });
};

/**
 * Return @message
 */
export const postTest: express.RequestHandler = function(req, res, next) {
  let test: TestOriginal & mongoose.Document = <any>new TestModal(req.body.test);
  test.save((err, doc: TestOriginal) => {
    if (!err) return res.json({ status: true, message:"Success" });
    else {
      if (err.code) return res.status(422).json({ status: false, message: err.code });
      else return next(err);
    }
  });
};

/**
 * Return @message
 */
export const updateTest: express.RequestHandler = function(req, res, next) {
  let test: TestOriginal = req.body.test;
  TestModal.updateOne({ _id: test._id }, { ...test }, function(err, doc) {
    if (err) return next(err);
    if (doc) {
      /**
       * Update category lastUpdated date so that it reflects that new test is added
       * when it is ready
       */
      if(test.catID && test.isTestReady) {
        CategoryModal.findById(test.catID, (err, category: Category) => {
          if (err) return next(err);
          if (category) {
            category.lastUpdated = req.body.localTime
            CategoryModal.updateOne({ _id: category._id }, category, function(err,doc) {
              if (err) return next(err);
              if (doc) return res.json({ status: true, message: "Success" });
              else next(new HttpException("Failed", 400));
            });
          }
          else return next(new Record404Exception());
        });    
      } else return res.json({ status: true, message:"Success" });
    }
    else return next(new HttpException("Failed", 400));
  });
};

/**
 * Return @answers_questions | @null
 */
export const getQuestionsAnswers: express.RequestHandler = function(req,res,next) {
  let tID = req.params.testID;

  /** Let us obtain @questions first */
  QuestionModal.find({ tID }, function(err, questions: QuestionOriginal[]) {
    if (err) return next(err);
    if (questions && questions.length) {
      /** Let us obtain @answers */
      AnswerModal.find({ tID }, (err, answers: Answer[]) => {
        if (err) return next(err);
        if (answers && answers.length) return res.json({ status: true, answers, questions });
        else return next(new Record404Exception());
      });
    } else return next(new Record404Exception());
  }).sort({sectionOrder: 1,  section: 'asc', _id: 'asc' });
};

/**
 * Return @TestWithFeatures
 */
export const getTestsByCategory: express.RequestHandler = function(req,res,next) {  
  let catID = req.params.catID;
  let pNo = req.params.pNo;
  TestModal.find(
    { catID, isTestReady:true },
    null,
    { skip: (pNo - 1) * config.noOfTestsPerPage, limit: config.noOfTestsPerPage },
    (err, tests) => {
      if (err) return next(err);
      else if (tests && tests.length) return res.json({ status: true, tests });
      else return next(new Record404Exception());
  }).sort({ _id: -1 });

};

/**
 * Return @Number
 */
export const getTestsByCategoryCount: express.RequestHandler = function(req, res, next) {
  let catID = req.params.catID;
  TestModal.countDocuments({ catID, isTestReady:true }, (err, count) => {
    if (!err) return res.json({ status: true, count });
    else return next(err);
  });
};

/**
 * Return @Number
 */
export const getTestsCount: express.RequestHandler = function(req, res, next) {
  TestModal.estimatedDocumentCount((err, count) => {
    if (!err) return res.json({ status: true, count });
    else return next(err);
  });
};

/**
 * Return @TestOriginals
 */
export const getTests: express.RequestHandler = function(req, res, next) {
  let pNo = req.params.pNo;
  TestModal.find(
    {},null,
    { skip: (pNo - 1) * config.noOfTestsPerPage, limit: config.noOfTestsPerPage}
    ,(err, tests) => {
      if (err) return next(err);
      else if (tests && tests.length) return res.json({ status: true, tests });
      else return next(new Record404Exception());
    }
  ).sort({ _id: -1 });
};

/**
 * Return @TestOriginals
 */
export const findTests: express.RequestHandler = function(req, res, next) {
  let obj = { name: { $regex: req.body.search, $options: "i" } };
  TestModal.find(obj, function(err,tests: TestOriginal[]) {
    if (err) return next(err);
    else if (tests && tests.length)
      return res.json({
        status: true,
        tests: tests.map(test => ({
          _id: test._id,
          name: test.name
        }))
      });
    else return next(new Record404Exception());
  });
};

/**
 * Return @message
 */
export const delTest: express.RequestHandler = function(req, res, next) {
  let proms = [
    TestModal.deleteOne({ _id: req.params.tID }).exec(),
    QuestionModal.deleteMany({ tID: req.params.tID }).exec(),
    AnswerModal.deleteMany({ tID: req.params.tID }).exec()
  ];
  Promise.all(proms)
    .then(() => res.json({ status: true, message: "Success" }))
    .catch(() => res.status(422).json({ status: false, message: "Failed" }));
};