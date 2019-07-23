import * as jwt from "jsonwebtoken";
import * as express from "express";

export interface CommonRes {
    status:boolean;
    message:string;
}

export class HttpException extends Error {
  status: number;
  message: string;
  constructor(message: string, status: number= 500) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export class Record404Exception extends HttpException {
    constructor() {
      super('Record not found', 404);
    }
}
 
export const verifyJwtToken:express.RequestHandler = (req, res, next) => {
    let token:string;
    if ('authorization' in req.headers)
        token = req.headers['authorization'].split(' ')[1];

    if (!token)
        return res.status(403).send({ status: false, message: 'Please Re-login' });
    else {
        jwt.verify(token, process.env.JWT_SECRET,
            /**
             * decoded ->  { _id: 1563274945715, iat: 1563773668, exp: 1563775468 }
             * _id -> userID because the generated jwt 
             *        token was signed with payload as userID
             * We pass it to next() for use 
             */
            (err, decoded:{_id:string}) => {
                if (err)
                    return res.status(500).send({ status: false, message: 'Authentication failed.' });
                else {
                    (<any>req)._id = decoded._id
                    next();
                }
            }
        )
    }
}