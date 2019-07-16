
import { Test } from '../amplitude-test/modals/test';

export interface Category {
    name:string;
    tests:Array<Number>;
    lastUpdated:Date;
    syllabus:string;
    id:number;
}