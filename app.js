 /*jshint esversion: 6*/
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const buzzRoutes = require('./routes/buzzwords.js');

// respond with contact form on the contact page
app.use(express.static('public'));

//parse application
app.use(bodyParser.urlencoded({extended: false}));

//attach buzz word router to express
app.use('/buzzword', buzzRoutes);

app.get('*', (req,res) => {
  res.send('404');
});

app.get('/', (req, res) => {
  res.send('/public/index.html');
});

app.post('/reset', (req, res) => {
  res.send({success : true});
});


//activate server
const server = app.listen(3000, () => {
  console.log('server listening on port 3000');
});