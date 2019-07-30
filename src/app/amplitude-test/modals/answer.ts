export interface Answers {
    /** @Index is question ID */
    [index:string]:{ value:string, data:string }
}
export interface AnswersForTest {
    _id:string; /** test ID */
    answers:Answers;
}