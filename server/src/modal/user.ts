import * as mongoose from "mongoose";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { processEnvironment } from "../../../config/global.config";
import { UserTest } from './test';
const environment: processEnvironment = <any>process.env;

/** Typescript Modal  */

export interface UserFeatures {
  isAdmin:boolean;
  favourites: string[];
  tests?: { [index: string]: UserTest };
}
export interface UserBase {
  fullName: string;
  email: string;
}

export interface User extends UserBase,UserFeatures{
  password: string;
  saltSecret: string;
  _id: string;
  verifyPassword: (password: string) => boolean;
  generateJwt: () => string;
}

export interface UserProfile extends UserBase, UserFeatures {
  id: string;
}

/** Mongoose Schema and Modal */

export const UserSchema = new mongoose.Schema<User & mongoose.Document>({
  fullName: {
    type: String,
    required: "Full name can't be empty"
  },
  email: {
    type: String,
    required: "Email can't be empty",
    unique: true
  },
  password: {
    type: String,
    required: "Password can't be empty",
    minlength: [4, "Password must be atleast 4 character long"]
  },
  saltSecret: String,
  _id: {
    type: String
  },
  favourites: { type: [String] },
  tests: mongoose.Schema.Types.Mixed,
  isAdmin:{ type: Boolean }
});

/**
 * Schema @Methods
 */
UserSchema.methods.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJwt = function() {
  return jwt.sign({ _id: this._id }, environment.jwtSecret, {
    expiresIn: environment.jwtExp
  });
};

/**
 * Validate @email path
 */
UserSchema.path("email").validate(val => {
  let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, "Invalid e-mail.");

/**
 * Run on @save event
 */
UserSchema.pre<User & mongoose.Document>("save", function(next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.saltSecret = salt;
      next();
    });
  });
});

export const UserModal = mongoose.model("User", UserSchema);
