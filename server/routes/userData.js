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

/**
 * @GET USER -> details @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */

router.get('/:id', function(req, res, next) {
    let id=req.params.id;
    UserModal.findById(id,function (err, doc) {
        if (err) { return next(err); }
        if(doc) {
            let t = _.pick(doc,['favourites','tests']);
            res.json(t);
        }
        else res.status(400).json({ status:false, message: 'Failed' });
    })
})   

/**
 * @GET USER -> favourites @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */


router.get('/:id/favourites', function(req, res, next) {
    let id=req.params.id;
    UserModal.findById(id,function (err, doc) {
        if (err) { return next(err); }
        if(doc) {
            let t = _.pick(doc,['favourites']);
            res.json(t.favourites);
        }
        else res.status(400).json({ status:false, message: 'Failed' });
    })
})   

/**
 * @POST USER -> favourites @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */


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

/**
 * @GET TEST's @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */


router.get('/:id/tests', function(req, res, next) {
    let id=req.params.id;
    UserModal.findById(id,function (err, doc) {
        if (err) { return next(err); }
        if(doc) {
            let t = _.pick(doc,['tests']);
            res.json(t.tests);
        }
        else res.status(400).json({ status:false, message: 'Failed' });
    })
})   

/**
 * @GET TEST @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */


router.get('/:id/tests/:tID', function(req, res, next) {
    let id=req.params.id, tID=req.params.tID;
    UserModal.findById(id,function (err, doc) {
        if (err) { return next(err); }
        if(doc) {
            if(doc.tests[tID]) res.json(doc.tests[tID]);
            else
                res.status(400).json({status:false, message:"Failed"});   
        }
        else res.status(400).json({ status:false, message: 'No record' });
    })
})   


/**
 * @POST TEST  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */


router.post('/:id/tests', function(req, res, next) {
    let id=req.params.id

    let newObj = {}, keyName = Object.keys(req.body)[0];
    newObj[`tests.${req.body._id}`] = req.body

    UserModal.updateOne(
        { "_id": id },
        { "$set": newObj},
        function (err, doc) {
            if (err) { return next(err); }
            if(doc) res.json({status:true, message:"Success"});
            else res.status(400).json({status:false, message:"Failed"});
        }
    )
})  



/**
 * @POST QUESTION @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */

router.post('/:id/tests/q', function(req, res, next) {
    let id=req.params.id, tID=req.body.id

    UserModal.findById(id, function(err, doc){
        if (err) { return next(err); }
        if (doc) {
            if(doc.tests[tID]) {
                let newObj = {}, keyName = Object.keys(req.body.question)[0];
                newObj[`tests.${tID}.questions.${keyName}`] = req.body.question[keyName]
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
            else
                res.status(400).json({status:false, message:"Failed"});  
        }
    })

})  

/**
 * @POST TIME @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */

router.post('/:id/tests/t', function(req, res, next) {
    let id=req.params.id, tID=req.body.id

    UserModal.findById(id, function(err, doc){
        if (err) { return next(err); }
        if (doc) {
            if(doc.tests[tID]) {
                let newObj = {}
                newObj[`tests.${tID}.time`] = req.body.time
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
            else
                res.status(400).json({status:false, message:"Failed"});  
        }
    })

})  




module.exports = router;
