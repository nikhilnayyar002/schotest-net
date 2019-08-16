import * as jwt from "jsonwebtoken";
import * as express from "express";
import { UserModal, User } from "../modal/user";
import { Environment } from "./config";
import * as multer from 'multer';

const environment: Environment = <any>process.env;

/** global types */

export interface CommonRes {
  status: boolean;
  message: string;
}

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

/** global function */

export const verifyJwtToken: express.RequestHandler = (req, res, next) => {
  let token: string;
  if ("authorization" in req.headers)
    token = req.headers["authorization"].split(" ")[1];

  if (!token)
    return res.status(403).send({ status: false, message: "Please Re-login" });
  else {
    jwt.verify(
      token,
      environment.JWT_SECRET,
      /**
       * decoded ->  { _id: 1563274945715, iat: 1563773668, exp: 1563775468 }
       * _id -> userID because the generated jwt
       *        token was signed with payload as userID
       * We pass it to next() for use
       */
      (err, decoded: { _id: string }) => {
        if (err)
          return res
            .status(401)
            .send({ status: false, message: "Authentication failed."});
        else {
          /** save userID in req as req._id */
          (<any>req)._id = decoded._id;
          next();
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
  if(data.length) 
    return data.map(e=>e._doc)
  return data._doc;
}

export const checkAdminRoute:express.Handler = (req,res,next)=>{
    UserModal.findById((<any>req)._id,(err,user:User)=>{
        if(err) next(new HttpException())
        if (!user)
            return res.status(404).json({ status: false, message: 'User record not found.' });
        else if(!user.isAdmin) 
            return res.status(403).send({ status: false, message: "Acess Forbidden. Not an Admin"});
        else next();
    })
}

/** 
 * 
 * Image upload support 
 * 
 * */

const accepted_extensions = ['jpg', 'png', 'jpeg'];
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req:express.Request, file, cb) {
        cb(null, req.params.id)
    }
});
export const imageUpload = multer({
    storage: storage,
    limits: { 
        fileSize: 2 * 1024 * 1024,  // 5 MB upload limit
        files: 1                    // 1 file
    },
    fileFilter: (req, file, cb) => {
        // if the file extension is in our accepted list
        if (
          accepted_extensions.some(ext => file.originalname.endsWith("." + ext))
          && file.mimetype &&  accepted_extensions.includes(file.mimetype.split('/')[1])
        ) {
            return cb(null, true);
        }
        // otherwise, return error
        return cb(new Error('Only ' + accepted_extensions.join(", ") + ' files are allowed!'), false);
    }
}).single('image');


