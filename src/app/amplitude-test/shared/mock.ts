import { Question } from '../modals/question';
import { Test } from '../modals/test';
import { QuestionState } from './global';

const mockedQuestions:Array<Question>=[
    {
        content:"<p>Answer the following question according to the information given below.</p><p>If a, b, c are the sides of a triangle, and a2 + b2 + c2 = bc + ca + ab, then the triangle is</p>",
        image:"",
        isComprehension:false,
        comprehensionContent:'',
        answers:[
            "equilateral",
            "isosceles",
            "right angled",
            "obtuse angled"
        ],
        state:QuestionState.Unvisited,
        checkedAnswerIndex:null,
        id:0
    },
    {
        content:"MCQ 2",
        image:"http://www.puzzles9.com/wp-content/uploads/2016/09/puz581.png",
        isComprehension:false,
        comprehensionContent:'',
        answers:[
            "1",
            "2",
            "3",
            "4"
        ],
        state:QuestionState.Unvisited,
        checkedAnswerIndex:null,
        id:1
    },
    {
        content:"MCQ 3",
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Westerner_and_Arab_practicing_geometry_15th_century_manuscript.jpg/250px-Westerner_and_Arab_practicing_geometry_15th_century_manuscript.jpg",
        isComprehension:true,
        comprehensionContent:'',
        answers:[
            "1",
            "2",
            "3",
            "4"
        ],
        state:QuestionState.Unvisited,
        checkedAnswerIndex:null,
        id:2
    },
        
];

export const mockedTests:Array<Test>=[
    {    
        id:1,
        name:"mockedTest",
        questions:mockedQuestions,
        sections:[
            { name:"Section A", startQ:1, endQ:2},
            { name:"Section B", startQ:3, endQ:3},        
        ],
        time:10
    }
];

