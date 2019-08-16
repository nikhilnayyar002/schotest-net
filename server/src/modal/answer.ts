import * as mongoose from "mongoose";

/** Typescript Modal  */

export interface Answer {
    _id:string; /** Question ID */
    tID:string;
    value:string;
    data:string;
}

/** Mongoose Schema and Modal */

export const AnswerSchema = new mongoose.Schema<Answer & mongoose.Document>({
    _id: String,
    tID:String,
    value:String,
    data:String
});

export const AnswerModal= mongoose.model("Answer", AnswerSchema);
