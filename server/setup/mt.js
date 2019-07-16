const mongoose = require('mongoose');
const TestModal = require('../modals/test')
var CategoryModal = require('../modals/category')

const mdb_url="mongodb://nikhilnayyar:dnaagent6@ds251507.mlab.com:51507/schotest"


mongoose.connect(mdb_url, (err) => {
    if (!err) {
        console.log('MongoDB connection succeeded.');
        new TestModal(mockedTest1).save(function (err) {
            if (err) {
              console.log('ERROR CREATING mockedTest');
              return
            }
            console.log('New mockedTest created' );
        });
        new TestModal(mockedTest2).save(function (err) {
            if (err) {
              console.log('ERROR CREATING mockedTest');
              return
            }
            console.log('New mockedTest created' );
        });
    }
    else { console.log('Error in MongoDB connection : '); }
});

/**
 * Definning the @mockedTest variable below
 */
var mockedQuestions=[
    {
        content:"<p>Answer the following question according to the information given below.</p><p>If a, b, c are the s_ides of a triangle, and a2 + b2 + c2 = bc + ca + ab, then the triangle is</p>",
        image:"",
        isComprehension:false,
        comprehensionContent:'',
        answers:[
            "equilateral",
            "isosceles",
            "right angled",
            "obtuse angled"
        ],
        state:"Unvisited",
        checkedAnswerIndex:null,
        _id:0,
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
        state:"Unvisited",
        checkedAnswerIndex:null,
        _id:1
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
        state:"Unvisited",
        checkedAnswerIndex:null,
        _id:2
    },
        
];

var mockedTest1= {    
    _id:(new Date).getTime(),
    name:"mockedTest",
    questions:mockedQuestions,
    sections:[
        { name:"Section A", startQ:1, endQ:2},
        { name:"Section B", startQ:3, endQ:3},        
    ],
    time:10,
    detail:"Simple mocked Test"
};
var mockedTest2= {  
    _id:(new Date).getTime()+1,  
    name:"mockedTest",
    questions:mockedQuestions,
    sections:[
        { name:"Section A", startQ:1, endQ:1},
        { name:"Section B", startQ:2, endQ:3},        
    ],
    time:40,
    detail:"Simple mocked Test 2"
};