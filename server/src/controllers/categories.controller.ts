import * as express from "express";
import * as mongoose from "mongoose";
import { CategoryModal, Category } from "../modal/category";
import {
  Record404Exception,
  HttpException,
  returnTyped,
  simplifyMongoose,
  testFunc
} from "../config/global";
import { UserModal, User } from "../modal/user";
import { TestModal, TestOriginal, TestResponse } from "../modal/test";

/**
 * Return @message
 */
export const postCategory: express.RequestHandler = function(req, res, next) {
  let test: Category & mongoose.Document = <any>new CategoryModal(req.body);
  test.save((err, doc: Category) => {
    if (!err) res.json({ status: true, category: doc });
    else {
      if (err.code) res.status(422).json({ status: false, message: err.code });
      else return next(err);
    }
  });
};

/**
 * Return @Category_Arr
 */
export const getCategories: express.RequestHandler = (req, res, next) => {
  CategoryModal.find({}, function(err, categories: Category[]) {
    if (err) {
      return next(err);
    }
    if (categories) res.json({ status: true, categories: categories });
    else next(new Record404Exception());
  });
};

/**
 * Return @Category
 */
export const getCategory: express.RequestHandler = function(req, res, next) {
  let categoryID = req.params.categoryID;
  CategoryModal.findById(categoryID, (err, category: Category) => {
    if (err) {
      return next(err);
    }
    if (category) res.json({ status: true, category });
    else next(new Record404Exception());
  });
};

/**
 * Return @TestResponse_Arr
 */
export const getCategoryTests: express.RequestHandler = (req, res, next) => {
  let categoryID = req.params.categoryID;

  /** find category  */
  CategoryModal.findById(categoryID, (err, category: Category) => {
    if (err) {
      return next(err);
    }
    if (category) {
      /** fetch original tests corresponding to tests in this category */
      let proms = [];
      for (let t of category.tests) proms.push(TestModal.findById(t).exec());

      Promise.all(proms)
        .then((testsRes: TestOriginal[]) => {
          if (testsRes.length) {
            let tests = returnTyped<TestResponse[]>(
              simplifyMongoose<TestOriginal[]>(testsRes)
            );

            /** Map questions. Common operation */
            for(let i=0;i<tests.length;++i) {
              tests[i].questions = testFunc.getTestResponseQ(testsRes[i])
            }

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
        })
        .catch(err => next(new HttpException("Please try again later.")));
    } else next(new Record404Exception());
  });
};
