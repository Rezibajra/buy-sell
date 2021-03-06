var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var config = require('./config/database');

//connect to db
mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
    console.log('connected to db');
});

//init app
var app = express();

//view engine setup
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','ejs');

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//set routes
var pages = require('./routes/pages.js');
var adminPages = require('./routes/admin_pages.js');

app.use('/admin/pages', adminPages);
app.use('/', pages);

//start server
var port = 3001;
app.listen(port, function() {
    console.log('Server started on port '+ port);
});
