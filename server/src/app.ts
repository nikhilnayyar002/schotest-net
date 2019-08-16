import * as express from 'express';
import * as path from 'path';
import * as morgan from 'morgan'
import * as cors from 'cors'
import * as passport from 'passport'
import * as mongoose from 'mongoose'
import { Environment } from "./config/config";
import { UserRouter } from './router/user.router';
import { TestRouter } from './router/test.router';
import { CategoryRouter } from './router/category.router';
import { UserDataRouter } from './router/userData.router';
import { HttpException, verifyJwtToken } from './config/global';

import "./config/passportConfig";
import "./config/setupEnv"
import { answerRouter } from './router/answer.router';
import { questionRouter } from './router/question.router';
import { instructionRouter } from './router/instruction.router';
import { imageRouter } from './router/image.router';

const environment: Environment = <any>process.env;



/**
 * setup dev environment (part 1)
 * 
 * Please setup your environment using as:
 * 1. make your file.
 * 2. Save it in setup folder.
 * 3. Run node setup/setup 
 */
// require('dotenv').config()


mongoose.set('bufferCommands', false);
//mongoose.set('bufferMaxEntries', 0);

/** Depreciation warnings */
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

mongoose.connect(environment.MONGODB_URI, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});

// mongoose.connection.on('connected', function(){
//     console.log("Mongoose default connection is open to ");
// });

// mongoose.connection.on('error', function(err){
//     console.log("Mongoose default connection has occured "+err+" error");
// });

// mongoose.connection.on('disconnected', function(){
//     console.log("Mongoose default connection is disconnected");
// });

let app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.disable('view cache');

app.use(cors());
app.use(passport.initialize());

/**
 * pre-requesties
 */
// app.all('*',function(req, res, next) {
//   res.set('Access-Control-Allow-Origin', '*');
//   res.set('Access-Control-Allow-Headers','Content-Type');
//   next();
// })

app.use('/auth', UserRouter);

app.use('/tests', verifyJwtToken, TestRouter);
app.use('/categories', verifyJwtToken, CategoryRouter);
app.use('/userData', verifyJwtToken, UserDataRouter);
app.use('/answers', verifyJwtToken, answerRouter);
app.use('/questions', verifyJwtToken, questionRouter);
app.use('/instructions', verifyJwtToken, instructionRouter)
app.use('/images', imageRouter)
app.use("**", invalidPath)

function invalidPath(req,res, next) {
  next(new HttpException("Invalid path",404))
}

/**
 * error handler
 */
function errorMiddleware(
  error: HttpException, req: express.Request, res: express.Response, next: express.NextFunction
  ) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  res.status(status).json({status:false, message})
}

app.use(errorMiddleware);

export default app;
