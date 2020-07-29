const express =  require('express');
const mySQL = require('mysql');
var bodyParser = require('body-parser');
const fs =  require('fs')
const file = require('express-fileupload');

const app =  express();
app.use(bodyParser.urlencoded({extended:false}));

const restApi =  require('./route/db')
var con = mySQL.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database:'testdb'
    
});

con.connect(function(err) {
    if (err) throw err;
     console.log("Connected!");
    // con.query('create database testdb',(err, result) =>{
    //   if(err) return err;
    //   console.log('created')
    // })
  });



app.use(file());

app.use(express.static(__dirname + '/public'));
app.use('/style.css', express.static(__dirname + '/public/style.css'));      


app.use(bodyParser.json()); 

app.use('/db',restApi);

app.listen(3000);