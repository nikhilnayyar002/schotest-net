import * as express from "express";
import { Record404Exception, HttpException } from "../config/global";
import { UserModal, User, UserTest } from "../modal/user";
import { TestModal, Test } from "../modal/test";

export const getUserData: express.RequestHandler = (req, res, next) => {
  let id = req.params.userID;
  UserModal.findById(id, function(err, user: User) {
    if (err) {
      return next(err);
    }
    if (user)
      res.json({
        status: true,
        user: { favourites: user.favourites, tests: user.tests }
      });
    else next(new Record404Exception());
  });
};

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
 * Send @id in body
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

export const postUserTest: express.RequestHandler = (req, res, next) => {
  let id = req.params.userID;
  let newObj = {};
  newObj[`tests.${req.body._id}`] = req.body;
  UserModal.updateOne({ _id: id }, { $set: newObj }, function(err, doc) {
    if (err) {
      return next(err);
    }
    if (doc) return res.json({ status: true, message: "Success" });
    else next(new HttpException("Failed", 400));
  });
};

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

export const getPausedTests: express.RequestHandler = (req, res, next) => {
  return commonCompAndPaus(req, res, next, time => time != 0);
};

export const getCompletedTests: express.RequestHandler = (req, res, next) => {
  return commonCompAndPaus(req, res, next, time => time == 0);
};

function commonCompAndPaus(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
  condition: (time: number) => boolean
) {
  let id = req.params.userID;
  UserModal.findById(id, function(err, user: User) {
    if (err) {
      return next(err);
    }
    if (user) {
      if (user.tests) {
        let proms = [];
        for (let i in user.tests)
          if (condition(user.tests[i].time))
            proms.push(TestModal.findById(user.tests[i]._id).exec());

        Promise.all(proms)
          .then((tests: Test[]) => {
            if (tests.length) {
              tests = tests.map(test => {
                test.questions = <any>{
                  length: Object.keys(test.questions).length,
                  marks: (function() {
                    let marks = 0;
                    for (let i in test.questions)
                      marks += test.questions[i].marks;
                    return marks;
                  })()
                };
                test.time = user.tests[test._id].time;
                return test;
              });

              res.json({ status: true, tests: tests });
            } else next(new Record404Exception());
          })
          .catch(err => next(new HttpException("Please try again later.")));
      } else return next(new Record404Exception());
    } else next(new Record404Exception());
  });
}
