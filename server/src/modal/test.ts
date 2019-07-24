import * as mongoose from "mongoose";

/** Typescript Modal  */
export interface Question  {
    content:string;
    image:string;
    isComprehension:boolean;
    comprehensionContent:string;
    answers:string[];
    _id: string;
    section:string;
}

export interface Test  {
    name:string;
    questions:{[index:string]:Question};
    /** Starting question ids of corresponding sections */
    sections:{[index:string]:string};
    time: number;
    detail:string;
    _id:string;
}

/** Mongoose Schema and Modal */

export const TestSchema = new mongoose.Schema<Test & mongoose.Document>({
    name:String,
    questions: mongoose.SchemaTypes.Mixed,
    sections: mongoose.SchemaTypes.Mixed,
    time: { type:Number },
    detail:{type:String},
    _id: { type:String },
});


/**
 * Schema @Methods
 */

export const TestModal =mongoose.model("Test", TestSchema);
