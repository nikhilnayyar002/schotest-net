const mongoose = require('mongoose');
const TestModal = require('../modals/test')
var CategoryModal = require('../modals/category')

const mdb_url="mongodb://nikhilnayyar:dnaagent6@ds251507.mlab.com:51507/schotest"

mongoose.connect(mdb_url, (err) => {
    if (!err) {
        console.log('MongoDB connection succeeded.');

        new CategoryModal({    
            _id:(new Date()).getTime(),
            name:"Bank PO",
            tests:[
                1563271643432
            ],
            lastUpdated: new Date(),
            syllabus: "ENg"
        }).save(function (err) {
            if (err) {
              console.log('ERROR CREATING mockedTest');
              return
            }
            console.log('New mockedTest created' );
        });

        new CategoryModal({    
            _id:(new Date()).getTime() + 1,
            name:"Bank GO",
            tests:[
                1563271643433
            ],
            lastUpdated: new Date(),
            syllabus: "ENg"
        }).save(function (err) {
            if (err) {
              console.log('ERROR CREATING mockedTest');
              return
            }
            console.log('New mockedTest created' );
        });


        
    }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});