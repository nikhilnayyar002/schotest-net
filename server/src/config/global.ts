import * as jwt from "jsonwebtoken";
import * as express from "express";
import { UserModal, User } from "../modal/user";
import * as multer from "multer";
import * as path from "path";
import * as fs from "fs";
import * as cryptoJS from "crypto-js";

import { FILELISTS } from "../../../global/global";
import {
  processEnvironment,
  globalEnvironment
} from "../../../config/global.config";
let config: globalEnvironment = require("../../../config/config");
const environment: processEnvironment = <any>process.env;


export class HttpException extends Error {
  status: number;
  message: string;
  constructor(message: string = null, status: number = 500) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
export class Record404Exception extends HttpException {
  constructor() {
    super("Record not found", 404);
  }
}

/** 
 *  A middleware that verifies the token and decode the user "_id"
 *  out of JSON Web Token for further use.
 */
export const verifyJwtToken: express.RequestHandler = (req, res, next) => {
  let token: string;

  if ("authorization" in req.headers)
    token = (<string>req.headers["authorization"]).split(" ")[1];

  /**
   * no_authorization_header
   * */
  if (!token)
    return res.status(403).send({ status: false, message: "Please Re-login" });
  else {
    jwt.verify(
      token,
      environment.jwtSecret,
      /**
       * decoded ->  { _id: 1563274945715, iat: 1563773668, exp: 1563775468 }
       * _id -> userID, because the generated jwtToken was signed with payload as userID
       * We pass it to middleware as "(<any>req)._id" for use.
       */
      (err, decoded: { _id: string }) => {
        if (err)
          return res.status(401).send({ status: false, message: "Authentication failed." });
        else {
          /** save userID in req as req._id */
          (<any>req)._id = decoded._id;
          return next();
        }
      }
    );
  }
};

export function returnTyped<T>(data: any): T {
  return data as T;
}

/** mongoose result to _doc */
export function simplifyMongoose<T>(data: any): T {
  if (data.length) return data.map(e => e._doc);
  return data._doc;
}

export const checkAdminRoute: express.Handler = (req, res, next) => {
  UserModal.findById((<any>req)._id, (err, user: User) => {
    if (err) return next(new HttpException());
    /**
     * @user_not_found
     */
    if (!user)
      return res.status(404).json({ status: false, message: "User record not found." });
    /**
     * @not_an_admin
     */
    else if (!user.isAdmin)
      return res.status(403).send({ status: false, message: "Acess Forbidden. Not an Admin" });
    else return next();
  });
};

// ***************************  Image upload support

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    let dir = path.join(__dirname, `../..${config.server.imageUploads}`);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(
      null,
      /** remove the "/" from "/path.." using string.slice() and pass it*/
      config.server.imageUploads.slice(1, config.server.imageUploads.length)
    );
  },
  filename: function(req: express.Request, file, cb) {
    /**
     * use the id value as filename. id would be like: cat_1566038728579.jpeg
     */
    cb(null, req.params.id);
  }
});

export const imageUpload = multer({
  storage: storage,
  limits: {
    fileSize: config.server.imageUploadSize,
    files: 1 // 1 file
  },
  fileFilter: (req, file, cb) => {
    // if the file extension is in our accepted list
    if (
      FILELISTS.image.some(ext => file.originalname.endsWith("." + ext)) &&
      file.mimetype &&
      FILELISTS.image.includes(file.mimetype.split("/")[1])
    ) {
      return cb(null, true);
    }
    // otherwise, return error
    return cb(
      new Error("Only " + FILELISTS.image.join(", ") + " files are allowed!"),
      false
    );
  }
}).single(config.imageFormDataName);

/**
 * This function is copied from client side
 * @param keys secret
 * @param value value to be decrypted
 */
export function decryptValue(secret:string, value:string) {
  return cryptoJS.AES.decrypt(value, secret).toString(cryptoJS.enc.Utf8)
}

export function rtnDecryptReqHandler(secret:string):express.RequestHandler {
  return function(req,res,next) {
    req.body.password = decryptValue(secret,req.body.password)
    next()
  }
}



