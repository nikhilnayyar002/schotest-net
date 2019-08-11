import * as express from "express";
import * as mongoose from "mongoose";
import { CategoryModal, Category } from "../modal/category";
import {
  Record404Exception,
  HttpException,
  returnTyped,
  simplifyMongoose
} from "../config/global";
import { UserModal, User } from "../modal/user";
import { TestModal, TestOriginal, TestWithFeatures } from "../modal/test";

/**
 * Return @message | @Category
 */
export const postCategory: express.RequestHandler = function(req, res, next) {
  let category: Category = req.body;
  let cat: Category & mongoose.Document = <any>new CategoryModal(category);
  cat.save((err, doc: Category) => {
    if (!err) res.json({ status: true, category: doc });
    else {
      if (err.code)
        res.status(422).json({ status: false, message: err.code });
      else return next(err);
    }
  });
};

/**
 * Return @message
 */
export const updateCategory: express.RequestHandler = function(req, res, next) {
  let category: Category = req.body;

  CategoryModal.updateOne(
    { _id: category._id },
    { ...category },
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
 * Return @Instruction_Arr
 */
export const getCategoryStates:express.RequestHandler = function(req, res, next) {
  CategoryModal.find({},function (err, categories:Category[]) {
    if (err) { return next(err); }
    if(categories && categories.length)
      res.json({
        status:true,
        categories:categories.map(cat => ({_id:cat._id, name:cat.name}))
      })
    else next(new Record404Exception())
  })
}


/** **************************** Old code ********************** */

/**
 * Return @message | @Category
 */
// export const postCategory: express.RequestHandler = function(req, res, next) {
//   let category: Category = req.body;

//   /** check if test ID's provided are good or not */
//   if (category.tests && category.tests.length) {
//     /** fetch tests */
//     let proms = [];
//     for (let t of category.tests) proms.push(TestModal.findById(t).exec());
//     Promise.all(proms)
//       .then((testsRes: TestOriginal[]) => {
//         if (testsRes.length && !testsRes.includes(null)) {
//           /** check if tests are ready */
//           let errMessage: string = "";
//           for (let t of testsRes) {
//             if (!t)
//               errMessage += `${
//                 category.tests[testsRes.indexOf(t)]
//               } not found.\n`;
//             else if (!t.isTestReady)
//               errMessage += `${t._id} is not ready yet.\n`;
//           }

//           if (!errMessage) save() /** proceed to save */
//           else res.status(422).json({ status: false, message: errMessage });
//         } else
//           res.status(404).json({ status: false, message: "Tests not found" });
//       })
//       .catch(err =>
//         next(new HttpException(typeof err == "string" ? err : err.message))
//       );
//   } else save() /** proceed to save */

//   function save() {
//     let cat: Category & mongoose.Document = <any>new CategoryModal(category);
//     cat.save((err, doc: Category) => {
//       if (!err) res.json({ status: true, category: doc });
//       else {
//         if (err.code)
//           res.status(422).json({ status: false, message: err.code });
//         else return next(err);
//       }
//     });
//   }
// };