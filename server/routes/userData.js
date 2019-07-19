var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');  

var UserModal = mongoose.model('User');


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
    let id=req.params.id;
    UserModal.findById(id,function (err, doc) {
        if (err) { return next(err); }
        if(doc) {
            let t = _.pick(doc,['favourites','tests']);
            t.status = true
            res.json(t);
        }
        else res.status(400).json({ status:false, message: 'Failed' });
    })
})   

router.get('/:id/favourites', function(req, res, next) {
    let id=req.params.id;
    UserModal.findById(id,function (err, doc) {
        if (err) { return next(err); }
        if(doc) {
            let t = _.pick(doc,['favourites']);
            t.status = true
            res.json(t);
        }
        else res.status(400).json({ status:false, message: 'Failed' });
    })
})   


router.post('/:id/favourites', function(req, res, next) {
    let id=req.params.id;

    UserModal.updateOne(
        { "_id": id },
        { "$push": { "favourites": req.body.id }},
        function (err, doc) {
            if (err) { return next(err); }
            if(doc) res.json({status:true, message:"Success"});
            else res.status(400).json({status:false, message:"Failed"});
        }
    )
}) 

router.get('/:id/tests', function(req, res, next) {
    let id=req.params.id;
    UserModal.findById(id,function (err, doc) {
        if (err) { return next(err); }
        if(doc) {
            let t = _.pick(doc,['tests']);
            t.status = true
            res.json(t);
        }
        else res.status(400).json({ status:false, message: 'Failed' });
    })
})   

router.post('/:id/tests', function(req, res, next) {
    let id=req.params.id

    UserModal.updateOne(
        { "_id": id },
        { "$push": { "tests": req.body.test }},
        function (err, doc) {
            if (err) { return next(err); }
            if(doc) res.json({status:true, message:"Success"});
            else res.status(400).json({status:false, message:"Failed"});
        }
    )
})  

router.post('/:id/tests/q', function(req, res, next) {
    let id=req.params.id

    UserModal.findById(id, function(err, doc){
        if (err) { return next(err); }
        if (doc) {
            let i=0;
            for(i=0; i < doc.tests.length; ++i) {
                let test = doc.tests[i]
                if(test && test._id == req.body.id ) break
            }
            if(i == doc.tests.length) 
                res.status(400).json({status:false, message:"Failed"});
            let newObj = {};
            newObj[`tests.${i}.questions`] = req.body.questions
            UserModal.updateOne(
                { "_id": id },
                { "$set": newObj},
                function (err, doc) {
                    if (err) { return next(err); }
                    if(doc) res.json({status:true, message:"Success"});
                    else res.status(400).json({status:false, message:"Failed"});
                }
            )
        }
    })


})  



module.exports = router;
