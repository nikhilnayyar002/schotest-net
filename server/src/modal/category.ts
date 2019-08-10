import * as mongoose from "mongoose";

/** Typescript Modal  */

export interface Category  {
    name:string;
    tests:string[];
    lastUpdated: Date;
    _id:string;
    syllabus:string;
    image:string;

    insID:string;
}

/** Mongoose Schema and Modal */

export const CategorySchema = new mongoose.Schema<Category & mongoose.Document>({
    name:{type:String},
    tests: {type:[String]},
    lastUpdated: { type:Date },
    _id: { type:String },
    syllabus: {type:String},
    image: {type:String},

    insID:{type:String}
});


export const CategoryModal = mongoose.model("Category", CategorySchema);
