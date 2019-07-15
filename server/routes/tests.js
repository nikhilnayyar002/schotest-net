var express = require('express');
var router = express.Router();
var TestModal = require('../modals/test')
const mongoose = require('mongoose');

router.all('*', function(req,res, next) {

  /**
   * @Handling_MongoDB_Connection_Error 
   *  _readyState values:
   * 
   * '0': 'disconnected', '1': 'connected', '2': 'connecting',
   * '3': 'disconnecting','99': 'uninitialized',
   * 
   *  Currently i am only setting error condition.
   *  ON other bad conditions there will be no response.
   *  
   *  one can also add a setTimeOut(()=> res.send("db not ready."), k000) 
   *  function after each query so that a response is send k sec.
   * 
   */
  if(!mongoose.connections[0]._readyState) next(new Error('error connecting db'));
  
  next();
})

router.get('/:id', function(req, res, next) {
  let testID=req.params.id;

  TestModal.findById(testID,function (err, test) {
    if (err) { return next(err); }
    res.json(test)
  })
 
});


router.post('/:id/questions/:qid', function(req, res, next) {
  let testID=req.params.id;
  let questionID=req.params.qid;

  TestModal.findById(testID, function (err, test) {
    if (err) { return next(err); }
    test.questions[questionID].checkedAnswerIndex=req.body.data;
    test.save(function (err) {
      if (err) { return next(err); }
      // Successful
      res.json({status:"Successful"})
    });
  })
});


router.post('/:id/time', function(req, res, next) {
  let testID=req.params.id;

  TestModal.findById(testID, function (err, test) {
    if (err) { return next(err); }
    test.time=req.body.data;
    test.save(function (err) {
      if (err) { return next(err); }
      // Successful
      res.json({status:"Successful"})
    });
  })
});


module.exports = router;
