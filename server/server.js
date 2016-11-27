const express = require('express');
const app = express();
const cors = require('cors');
const scheduleController = require('./schedule.js');


app.use(cors());

app.get('/', function(req, res){
	res.json('http://localhost:3000/schedule');
});

app.get('/schedule', scheduleController.getData);

app.listen(3000);

module.exports = app;