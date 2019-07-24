import * as express from "express";
import * as mongoose from "mongoose";

import { TestModal, Test } from "../modal/test";
import { Record404Exception } from "../config/global";

export const getTest:express.RequestHandler = function(req, res, next) {
    let testID=req.params.testID;
    TestModal.findById(testID,function (err, test:Test) {
      if (err) { return next(err); }
      if(test) res.json({status:true, test:test})
      else next(new Record404Exception())
    })
}

export const postTest:express.RequestHandler = function(req, res, next) {
  let test:Test & mongoose.Document = <any>new TestModal(req.body);
  test.save((err,doc:Test)=>{
    if (!err)
      res.json({ status:true, test:doc});
    else {
      if (err.code) res.status(422).json({ status:false, message:err.code});
      else next(err);
    }
  })
}


