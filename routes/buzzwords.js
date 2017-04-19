/*jshint esversion: 6*/
const express = require('express');
const router = express.Router();

const buzzWordCollection = [];

router.route('/')
  .get((req, res) => {
    res.send({'buzzWords': buzzWordCollection.map( (x) => {
      return x.buzzWord;
      })});
  })
  .post((req, res) => {
    if(buzzWordCollection.map((x) => {
      return x.buzzWord;}).indexOf(req.body.buzzWord) !== -1 || buzzWordCollection.length >= 5){
      res.send({success: false});
     } else {
      buzzWordCollection.push({'buzzWord': req.body.buzzWord, 'points': Number(req.body.points),
      'heard': false, 'newScore': 0});
      console.log(buzzWordCollection);
      res.send({success: true});
    }
  })
  .put((req, res) => {

  })
  .delete((req, res) => {
    res.json({success: true});
  });

module.exports = router;