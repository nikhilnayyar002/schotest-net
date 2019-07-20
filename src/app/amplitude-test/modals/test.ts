import { Question } from './question';
import { Section } from './sections';

export interface Test {
    name:string;
    questions:Array<Question>;
    sections:Array<Section>;
    time:number;
    detail:string;
    
    /*currently for dev. purpose: in-momory-api*/
    id:number;

}
