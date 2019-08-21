import * as express from "express";
import * as mongoose from "mongoose";
import { CategoryModal, Category } from "../modal/category";
import { Record404Exception, HttpException } from "../config/global";

/**
 * Return @message
 */
export const postCategory: express.RequestHandler = function(req, res, next) {
  let category: Category = req.body;
  let cat: Category & mongoose.Document = <any>new CategoryModal(category);
  cat.save((err, doc: Category) => {
    if (!err) return res.json({ status: true, message: "Success" });
    else {
      if (err.code) return res.status(422).json({ status: false, message: err.code });
      else return next(err);
    }
  });
};

/**
 * Return @message
 */
export const updateCategory: express.RequestHandler = function(req, res, next) {
  let category: Category = req.body;
  CategoryModal.updateOne({ _id: category._id }, { ...category }, function(err,doc) {
    if (err) return next(err);
    if (doc) return res.json({ status: true, message: "Success" });
    else return next(new HttpException("Failed", 400));
  });
};

/**
 * Return @Category
 */
export const getCategory: express.RequestHandler = function(req, res, next) {
  let categoryID = req.params.categoryID;
  CategoryModal.findById(categoryID, (err, category: Category) => {
    if (err) return next(err);
    if (category) return res.json({ status: true, category });
    else return next(new Record404Exception());
  });
};

/**
 * Return @Categorys
 */
export const getCategories: express.RequestHandler = (req, res, next) => {
  CategoryModal.find({}, function(err, categories: Category[]) {
    if (err) return next(err)
    if (categories && categories.length)
      return res.json({ status: true, categories: categories });
    else return next(new Record404Exception());
  }).sort({ _id: -1 });
};

/**
 * Return @@Categorys
 */
export const getCategoryStates: express.RequestHandler = function(req,res,next) {
  CategoryModal.find({}, function(err, categories: Category[]) {
    if (err) return next(err);
    if (categories && categories.length)
      return res.json({
        status: true,
        categories: categories.map(cat => ({ _id: cat._id, name: cat.name }))
      });
    else return next(new Record404Exception());
  });
};

/**
 * Return @message
 */
export const delCategory: express.RequestHandler = function(req, res, next) {
  CategoryModal.deleteOne({ _id: req.params.categoryID })
    .exec()
    .then(() => res.json({ status: true, message: "Success" }))
    .catch(() => res.status(422).json({ status: false, message: "Failed" }));
};