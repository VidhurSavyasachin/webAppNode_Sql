var express = require("express");
var app = express();
var faker = require('faker');
var mysql = require('mysql');
var bodyParser = require("body-parser");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
     host: 'localhost',
     user: 'vidhursavyasachi',
     database: 'JOIN_US'
});




app.get("/", function(req, res){
 var q = 'SELECT COUNT(*) as count FROM users';
 connection.query(q, function (error, results) {
 if (error) throw error;
 var count = results[0].count;
 res.render('home',{data: count});
 });
});
app.post("/register",function(req,res){
    var person = {
        email: req.body.email
    };
    connection.query('INSERT INTO users SET ?' , person, function(err,results) {
        if(err) throw err;
        res.redirect("/");
    });
    
});

 

app.listen(8080,function(){
    console.log("App listening from 8080");
}); 