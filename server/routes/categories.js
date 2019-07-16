var express = require('express');
var router = express.Router();
var CategoryModal = require('../modals/category')
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

router.get('/all', function(req, res, next) {

  CategoryModal.find({},function (err, categories) {
    if (err) { return next(err); }
    res.json(categories)
  })
 
});


router.get('/:id', function(req, res, next) {
  let categoryID=req.params.id;

  CategoryModal.findById(categoryID,function (err, category) {
    if (err) { return next(err); }

    let proms=[];
    for(t of category.tests)
      proms.push(TestModal.findById(t).exec())
    Promise.all(proms).then((docs, err)=>{
      if(err) 
        return res.status(500).json({ status:false, message: 'Please try again later.' });
      else res.json(docs)
    })

  })
 
});



module.exports = router;
