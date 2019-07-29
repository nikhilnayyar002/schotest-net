import * as mongoose from "mongoose";

/** Typescript Modal  */

export interface AnswersForTest {
    _id:string; /** test ID */
    answers:{
        /** @Index is question ID */
        [index:string]:{ value:string, data:string }
    }
}

/** Mongoose Schema and Modal */

export const AnswersForTestSchema = new mongoose.Schema<AnswersForTest & mongoose.Document>({
    _id: { type: String },
    answers: mongoose.SchemaTypes.Mixed
});

export const AnswersForTestModal= mongoose.model("AnswersForTest", AnswersForTestSchema);
