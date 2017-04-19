/*jshint esversion: 6*/
const express = require('express');
const router = express.Router();

const buzzWordCollection = [];

//HELPER FUNCTIONS
// find index of Buzz Word
function findIndex(req) {
  const buzzWordsObj = req.app.get('buzzWords');
  return buzzWordsObj.buzzWords.findIndex((obj) => {
    return obj.buzzWord === req.body.buzzWord;
  });
}

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
      res.send({success: true});
    }
  })
  .put((req, res) => {
    if(buzzWordCollection.map((x) => {
      return x.buzzWord;}).indexOf(req.body.buzzWord) === -1){
      res.send({success: false});
    } else {
      buzzWordCollection[buzzWordCollection.map((x) => {
      return x.buzzWord;}).indexOf(req.body.buzzWord)].heard = true;

      buzzWordCollection[buzzWordCollection.map((x) => {
      return x.buzzWord;}).indexOf(req.body.buzzWord)].newScore += buzzWordCollection[buzzWordCollection.map((x) => {
      return x.buzzWord;}).indexOf(req.body.buzzWord)].points;

      res.send({'success': true, 'newScore': buzzWordCollection[buzzWordCollection.map((x) => {
      return x.buzzWord;}).indexOf(req.body.buzzWord)].newScore });
    }

  })
  .delete((req, res) => {
    if(buzzWordCollection.map((x) => {
      return x.buzzWord;}).indexOf(req.body.buzzWord) === -1){
      res.send({success: false});
    } else {
      buzzWordCollection.splice(buzzWordCollection.map((x) => {
      return x.buzzWord;}).indexOf(req.body.buzzWord), 1);
      res.send({success: true});
    }
    console.log(buzzWordCollection);
  });

module.exports = router;