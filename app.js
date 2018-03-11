const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const mysql = require('mysql');

User = require('./models/user');
//set the routes file
const appRoutes = require('./routes/app');
const users = require('./routes/users');
const data = require('./routes/data');
const app = express();
const port = 3000;

//const stockinfo = require('./routes/stockinfo');
//connect the mongodb
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/test', { useMongoClient: true, promiseLibrary: global.Promise });

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.get('/data', data.getData)
app.use('/users', users);
app.use('/', appRoutes);




app.listen(port, ()=>{
    console.log('Server started on port ' + port);
});

module.exports = app;
