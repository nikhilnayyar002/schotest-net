import * as express from "express";
import * as path from "path";
import * as fs from "fs";
import { Record404Exception, HttpException } from "../config/global";
import { globalEnvironment } from "../../../config/global.config";
let config:globalEnvironment = require("../../../config/config")

/**
 * Return @message
 */
export const postImage: express.RequestHandler = function(req, res, next) {
  // Passed validations, do something with the file (`req.file`)
  res.json({ sucess: true, message: "Image was uploaded successfully"});
};

/**
 * Return @__Image
 */
export const getImage: express.RequestHandler = function(req, res, next) {
  let id = req.params.id
  res.sendFile(path.join(__dirname, `../..${config.server.imageUploads}`, id),(error)=>{
    if(error) res.send("Error")
  });
};

/**
 * Return @message
 */
export const delImage: express.RequestHandler = function(req, res, next) {
  let id = req.params.id
  fs.unlink(path.join(__dirname, `../..${config.server.imageUploads}`, id), (err) => {
    if (err) next(new Record404Exception())
    else res.json({ status:true, message:"success."})
  });
};

