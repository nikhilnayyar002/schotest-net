import { Question } from './question';

export interface Test {
    name:string;
    questions:{[index:string]:Question};
    sections:{[index:string]:string};
    time:number;
    detail:string;
    _id:string;
}
