import * as mongoose from "mongoose";

/** Typescript Modal  */

export interface Category  {
    name:string;
    tests: {_id:string, name:string}[];
    lastUpdated: Date;
    _id:string;
    syllabus:string;
    image:string;
}

/** Mongoose Schema and Modal */

export const CategorySchema = new mongoose.Schema<Category & mongoose.Document>({
    name:{type:String},
    tests: {type:[mongoose.SchemaTypes.Mixed]},
    lastUpdated: { type:Date },
    _id: { type:String },
    syllabus: {type:String},
    image: {type:String}
});


export const CategoryModal = mongoose.model("Category", CategorySchema);
