import * as express from "express";
import * as mongoose from "mongoose";
import { Record404Exception, HttpException } from "../config/global";
import { Instruction, InstructionModal } from "../modal/instruction";

/**
 * Return @message
 */
export const postInstruction: express.RequestHandler = function(req,res,next) {
  let instruction: Instruction & mongoose.Document = <any>(
    new InstructionModal(req.body)
  );
  instruction.save((err, doc: Instruction) => {
    if (!err) return res.json({ status: true, message: "Success" });
    else {
      if (err.code) return res.status(422).json({ status: false, message: err.code });
      else return next(err);
    }
  });
};

/**
 * Return @Instruction
 */
export const getInstruction: express.RequestHandler = function(req, res, next) {
  let id = req.params.id;
  InstructionModal.findById(id, (err, instruction: Instruction) => {
    if (err) return next(err);
    if (instruction) return res.json({ status: true, instruction });
    else return next(new Record404Exception());
  });
};

/**
 * Return @message | @Instruction
 */
export const updateInstruction: express.RequestHandler = function(req,res,next) {
  let instruction: Instruction = req.body;

  InstructionModal.updateOne(
    { _id: instruction._id },
    { ...instruction },
    function(err, doc) {
      if (err) return next(err);
      if (doc) return res.json({ status: true, message: "Success" });
      else return next(new HttpException("Failed", 400));
    }
  );
};

/**
 * Return @Instructions
 */
export const getInstructionStates: express.RequestHandler = function(req,res,next) {
  InstructionModal.find({}, function(err, instructions: Instruction[]) {
    if (err) return next(err);
    if (instructions && instructions.length)
      return res.json({
        status: true,
        instructions: instructions.map(instruction => ({
          _id: instruction._id,
          name: instruction.name
        }))
      });
    else next(new Record404Exception());
  }).sort({ _id: -1 });
};
/**
 * Return @Instructions
 */
export const getInstructionByCategory: express.RequestHandler = function(req,res,next) {
  let catID = req.params.catID;
  InstructionModal.find({ catID }, function(err, instructions: Instruction[]) {
    if (err) return next(err);
    if (instructions && instructions.length)
      return res.json({ status: true, instruction: instructions[0] });
    else return next(new Record404Exception());
  });
};

/**
 * Return @message
 */
export const delInstruction: express.RequestHandler = function(req, res, next) {
  InstructionModal.deleteOne({ _id: req.params.id })
    .exec()
    .then(() => res.json({ status: true, message: "Success" }))
    .catch(() => res.status(422).json({ status: false, message: "Failed" }));
};
