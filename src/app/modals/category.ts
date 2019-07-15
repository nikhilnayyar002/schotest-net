
import { Test } from '../amplitude-test/modals/test';

export interface Category {
    name:string;
    tests:Array<Test>;
    lastUpdated:Date;
    syllabus:string;
    id:number;
}