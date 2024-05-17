// This file is the server file for get requests receiving HTTP requests from the index.html file.
// the file receives HTTP POST requests from the view file and queries the database and returns the data empl id, name, department number, and contact number for the selected user.
// The file uses the 'INSERT INTO emp table id, name, department number, contact and VALUES (?,?,?,?) ' , [Array req.body.id, req.body.name, req.body.depnum, req.body.contact],
// next, this file stores these values in a JavaScript array  id: req.body.id, name : req.body.name,   depnum : req.body.depnum , contact : req.body.contact  } 
// following this takes the received data from the form and pushes all data to an array empls.push(empl);
// After this, the res.render("add.ejs", {empls:empls}); sends data to the /add view. 

import {createRequire} from "module";
const require = createRequire(import.meta.url);

import express from "express";
const app = express();

var sqlite3 = require('sqlite3').verbose();




var  bodyParser = require('body-parser');




const empls = [];



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');
var db = new sqlite3.Database('./database/employees.db');



db.run('CREATE TABLE IF NOT EXISTS  emp(id TEXT, name TEXT, depnum TEXT, contact TEXT)');


        //https://medium.com/swlh/read-html-form-data-using-get-and-post-method-in-node-js-8d2c7880adbf
        //
        //https://www.sitepoint.com/community/t/node-and-sqlite-problem/349481/2`

app.get( '/', (req,res) => {



        res.render("index.ejs", empls);

});



app.get('/add', (req,res) => {
                res.render("add.ejs", {empls:empls});
});




app.post('/add', function(req,res)  {
        db.serialize(()  => {
                        db.run('INSERT INTO emp(id, name, depnum, contact) VALUES (?,?,?, ?)', [req.body.id, req.body.name, req.body.depnum, req.body.contact ],
                                function(err) {
                                        if(err) {
                                                        return console.log(err.message);
                                                }

                                                        const empl = {

                                                                id : req.body.id,
                                                                name : req.body.name,
                                                                depnum : req.body.depnum,
                                                                contact : req.body.contact,

                                                        };
                                                                empls.push(empl);



                                        console.log("New Employee has been added");

                                        res.render("add.ejs", {empls:empl});

        //res.render("add.ejs", ("New employee has been added into database with ID = "+req.body.id+ " and name = "+req.body.name+ " and Dep Number "+req.body.depnum+ " and Contact "+req.body.contact));


                                });


        });

});

app.post("/view", function(req,res) {

        db.serialize(() => {
                db.each('SELECT id ID, name NAME, depnum DEPNUM , contact CONTACT FROM emp WHERE id = ?' , [req.body.id] , function(err, row) {
                                                if(err) {
                                                        res.send("Error encountered while displaying");
                                                        return console.error(err.message);
                                                        }
                                        const empls = [];
                                        const empl = {

                                                        id : req.body.id,
                                                        name: row.NAME,
                                                        depnum: row.DEPNUM,
                                                        contact: row.CONTACT


                                        };
                                                        empls.push(empl);

                                                });
                                        res.render("view.ejs", {empls:empls});

                                });



                        console.log("Entry displayed successfully");
                });


app.listen(3000, () => {

console.log("Server started on port 3000");
});
