import * as mongoose from "mongoose";

/** Typescript Modal  */

export interface Instruction {
    _id:string;
    data:string;
    name:string;
    catID:string;
}

/** Mongoose Schema and Modal */

export const InstructionSchema = new mongoose.Schema<Instruction & mongoose.Document>({
    _id: String,
    data:String,
    name:String,
    catID:String
});

export const InstructionModal= mongoose.model("Instruction", InstructionSchema);
