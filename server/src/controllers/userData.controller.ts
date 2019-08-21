import * as express from "express";
import { Record404Exception, HttpException, returnTyped, simplifyMongoose } from "../config/global";
import { UserModal, User, UserFeatures } from "../modal/user";
import { CategoryModal, Category } from "../modal/category";
import { TestModal, TestWithFeatures, TestOriginal, UserTest } from "../modal/test";

/**
 *  returns @UserFeatures
 */
export const getUserData: express.RequestHandler = (req, res, next) => {
  let id = req.params.userID;
  UserModal.findById(id, function(err, user: User) {
    if (err) return next(err);
    else if (user) {
      let userRes:UserFeatures = {
        favourites: user.favourites, tests: user.tests, isAdmin:user.isAdmin
      }
      return res.json({ status: true, user: userRes});
    }
    else return next(new Record404Exception());
  });
};

/**
 *  returns @message
 */
export const postUserFavourites: express.RequestHandler = (req, res, next) => {
  let id = req.params.userID;
  UserModal.updateOne(
    { _id: id },
    { $push: { favourites: req.body.id } },
    function(err, doc) {
      if (err) return next(err);
      if (doc) return res.json({ status: true, message: "Success" });
      else return next(new HttpException("Failed", 400));
    }
  );
};

/**
 *  returns @message
 */
export const delUserFavourites: express.RequestHandler = (req, res, next) => {
  let id = req.params.userID;
  UserModal.updateOne({ _id: id },{ $pull: { favourites: req.body.id } },
    function(err, doc) {
      if (err) return next(err);
      if (doc) return res.json({ status: true, message: "Success" });
      else return next(new HttpException("Failed", 400));
    }
  );
};

/**
 *  returns @UserTests
 */
export const getUserTests: express.RequestHandler = (req, res, next) => {
  let id = req.params.userID;
  UserModal.findById(id, function(err, user: User) {
    if (err) return next(err);
    if (user) return res.json({ status: true, tests: user.tests });
    else return next(new Record404Exception());
  });
};

/**
 *  returns @UserTest
 */
export const getUserTest: express.RequestHandler = (req, res, next) => {
  let id = req.params.userID, tID = req.params.testID;
  UserModal.findById(id, function(err, user: User) {
    if (err) return next(err);
    if (user && user.tests && user.tests[tID]) 
      return res.json({ status: true, test: user.tests[tID] });
    else return next(new Record404Exception());
  });
};


/**
 *  returns @message
 */
export const postUserTestQ: express.RequestHandler = (req, res, next) => {
  let id = req.params.userID, tID = req.body.id;
  UserModal.findById(id, function(err, user: User) {
    if (err) return next(err);
    if (user) {
      let newObj = {}, keyName = Object.keys(req.body.question)[0];
      newObj[`tests.${tID}.questions.${keyName}`] = req.body.question[keyName];
      newObj[`tests.${tID}._id`] = tID;
      UserModal.updateOne({ _id: id }, { $set: newObj }, function(err, doc) {
        if (err) return next(err);
        if (doc) return res.json({ status: true, message: "Success" });
        else return next(new HttpException("Failed", 400));
      });
    } else return next(new Record404Exception());
  });
};

/**
 *  returns @message
 */
export const postUserTestT: express.RequestHandler = (req, res, next) => {
  let id = req.params.userID, tID = req.body.id;
  UserModal.findById(id, function(err, user: User) {
    if (err) return next(err);
    if (user) {
      let newObj = {};
      newObj[`tests.${tID}.time`] = req.body.time;
      newObj[`tests.${tID}._id`] = tID;
      newObj[`tests.${tID}.isTestOver`] = req.body.isTestOver;
      UserModal.updateOne({ _id: id }, { $set: newObj }, function(err, doc) {
        if (err) return next(err);
        if (doc) return res.json({ status: true, message: "Success" });
        else return next(new HttpException("Failed", 400));
      });
    } else return next(new Record404Exception());
  });
};

/**
 *  returns @TestWithFeatures
 */
export const getPausedTests: express.RequestHandler = (req, res, next) => {
  return commonCompAndPaus(req, res, next, test => !test.isTestOver);
};

/**
 *  returns @TestWithFeatures
 */
export const getCompletedTests: express.RequestHandler = (req, res, next) => {
  return commonCompAndPaus(req, res, next, test => test.isTestOver);
};

function commonCompAndPaus(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
  condition: (test: UserTest) => any
) {
  let id = req.params.userID;
  UserModal.findById(id, function(err, user: User) {
    if (err) return next(err);
    if (user && user.tests) {
      let proms = [];
      for (let i in user.tests)
        if (condition(user.tests[i]))
          proms.push(TestModal.findById(user.tests[i]._id).exec());
          
      Promise.all(proms).then((testsRes:TestOriginal[]) => {
        testsRes = testsRes.filter(t => t!=null)
        if (testsRes.length) {
          let tests = returnTyped<TestWithFeatures[]>(
            simplifyMongoose<TestOriginal[]>(testsRes)
          );
          for(let i=0;i<tests.length;++i) {
            let t= user.tests[tests[i]._id]
            if (t && (t.time != null || t.time != undefined)) {
              tests[i].time = t.time;
              tests[i].isTestOver = t.isTestOver;
            }
          }
          return res.json({ status: true, tests: tests });
        }
        else return next(new Record404Exception());
      })
      .catch(err => next(new HttpException("Please try again later.")));
    }
    else return next(new Record404Exception());
  });
}

/**
 *  returns @Categorys
 */
export const getUserFavourites: express.RequestHandler = (req, res, next) => {
  let id = req.params.userID;
  UserModal.findById(id, function(err, user: User) {
    if (err) return next(err);
    if (user && user.favourites.length) {
      let proms = [];
      for (let i of user.favourites)
        proms.push(CategoryModal.findById(i).exec());
      Promise.all(proms)
      .then((categories:Category[]) => {
        categories = categories.filter(t => t!=null)
        if (categories.length && !categories.includes(null))
          return res.json({ status: true, categories });
        else return next(new Record404Exception());
      })
      .catch(err => next(new HttpException("Please try again later.")));
    } 
    else return next(new Record404Exception());
  });
};




















