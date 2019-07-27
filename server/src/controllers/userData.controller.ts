import * as express from "express";
import { Record404Exception, HttpException, returnTyped, simplifyMongoose, testFunc } from "../config/global";
import { UserModal, User, UserTest, UserFeatures } from "../modal/user";
import { TestModal, TestResponse, TestOriginal } from "../modal/test";

/**
 *  returns @UserFeatures
 */
export const getUserData: express.RequestHandler = (req, res, next) => {
  let id = req.params.userID;
  UserModal.findById(id, function(err, user: User) {
    if (err) next(err);
    else if (user) {
      let userRes:UserFeatures = {
        favourites: user.favourites, tests: user.tests 
      }
      /** Send user favourites and tests */
      res.json({
        status: true,
        user: userRes
      });
    }
    else next(new Record404Exception());
  });
};

/**
 *  returns @string_Arr
 */
export const getUserFavourites: express.RequestHandler = (req, res, next) => {
  let id = req.params.userID;
  UserModal.findById(id, function(err, user: User) {
    if (err) {
      return next(err);
    }
    if (user) res.json({ status: true, favourites: user.favourites });
    else next(new Record404Exception());
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
      if (err) {
        return next(err);
      }
      if (doc) res.json({ status: true, message: "Success" });
      else next(new HttpException("Failed", 400));
    }
  );
};

/**
 *  returns @UserTest_Arr
 */
export const getUserTests: express.RequestHandler = (req, res, next) => {
  let id = req.params.userID;

  UserModal.findById(id, function(err, user: User) {
    if (err) {
      return next(err);
    }
    if (user) return res.json({ status: true, tests: user.tests });
    else next(new Record404Exception());
  });
};

/**
 *  returns @UserTest
 */
export const getUserTest: express.RequestHandler = (req, res, next) => {
  let id = req.params.userID,
    tID = req.params.testID;
  UserModal.findById(id, function(err, user: User) {
    if (err) {
      return next(err);
    }
    if (user) {
      if (user.tests && user.tests[tID])
        return res.json({ status: true, test: user.tests[tID] });
      else return res.json({ status: true, test: null });
    } else next(new Record404Exception());
  });
};


/**
 *  returns @message
 */
export const postUserTestQ: express.RequestHandler = (req, res, next) => {
  let id = req.params.userID,
    tID = req.body.id;
  UserModal.findById(id, function(err, user: User) {
    if (err) {
      return next(err);
    }
    if (user) {
      let newObj = {},
        keyName = Object.keys(req.body.question)[0];
      newObj[`tests.${tID}.questions.${keyName}`] = req.body.question[keyName];
      newObj[`tests.${tID}._id`] = tID;
      UserModal.updateOne({ _id: id }, { $set: newObj }, function(err, doc) {
        if (err) {
          return next(err);
        }
        if (doc) return res.json({ status: true, message: "Success" });
        else next(new HttpException("Failed", 400));
      });
    } else next(new Record404Exception());
  });
};

/**
 *  returns @message
 */
export const postUserTestT: express.RequestHandler = (req, res, next) => {
  let id = req.params.userID,
    tID = req.body.id;
  UserModal.findById(id, function(err, user: User) {
    if (err) {
      return next(err);
    }
    if (user) {
      let newObj = {};
      newObj[`tests.${tID}.time`] = req.body.time;
      newObj[`tests.${tID}._id`] = tID;
      newObj[`tests.${tID}.isTestOver`] = req.body.isTestOver;
      UserModal.updateOne({ _id: id }, { $set: newObj }, function(err, doc) {
        if (err) {
          return next(err);
        }
        if (doc) return res.json({ status: true, message: "Success" });
        else next(new HttpException("Failed", 400));
      });
    } else next(new Record404Exception());
  });
};

/**
 *  returns @TestResponse_Arr
 */
export const getPausedTests: express.RequestHandler = (req, res, next) => {
  return commonCompAndPaus(req, res, next, test => !test.isTestOver && test.time );
};

/**
 *  returns @TestResponse_Arr
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
    if (user) {
      if (user.tests) {
        let proms = [];
        for (let i in user.tests)
          if (condition(user.tests[i]))
            proms.push(TestModal.findById(user.tests[i]._id).exec());

        Promise.all(proms)
          .then((testsRes:TestOriginal[]) => {
            if (testsRes.length) {

              let tests = returnTyped<TestResponse[]>(
                simplifyMongoose<TestOriginal[]>(testsRes)
              );

              for(let i=0;i<tests.length;++i) {
                tests[i].questions = testFunc.getTestResponseQ(testsRes[i])
                tests[i].time = user.tests[tests[i]._id].time;
              }

              res.json({ status: true, tests: tests });
            } else next(new Record404Exception());
          })
          .catch(err => next(new HttpException("Please try again later.")));
      } else return next(new Record404Exception());
    } else next(new Record404Exception());
  });
}
