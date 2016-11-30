const express = require('express');
const app = express();
const cors = require('cors');
const scheduleController = require('./schedule.js');
const path = require('path');


app.use(cors());

app.get('/', function(req, res){
	res.statusCode = 200;
  res.contentType('text/html', 'charset=UTF-8');
  res.sendFile(path.join(__dirname, '../client/index.html'));
  console.log(res.contentType);
	// res.json('http://localhost:3000/schedule');
});

app.get('/schedule', scheduleController.getData);

app.listen(3000);

module.exports = app;