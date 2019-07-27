import * as mongoose from "mongoose";

/** Typescript Modal  */

export interface AnswersForTest {
    _id:string; /** Question ID */
    answers:{
        [index:string]:{ value:string, data:string }
    }
}

/** Mongoose Schema and Modal */

export const AnswersForTestSchema = new mongoose.Schema<AnswersForTest & mongoose.Document>({
    answers: mongoose.SchemaTypes.Mixed,
    _id: { type: String },
});

export const AnswersForTestModal= mongoose.model("AnswersForTest", AnswersForTestSchema);
