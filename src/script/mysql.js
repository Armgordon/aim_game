console.log('my sql')

//IMPORTS
// import express from 'express';
// import path from 'path'
// import mysql from 'mysql'


//REQUIRES
const mysql = require('mysql')
const path = require('path')


//config
const conn = mysql.createConnection( {
    host: 'localhost',
    user: 'newuser',
    password: 'password',
    database: 'leaderboard'
})
//Connect
conn.connect( err => {
    if (err) {
        console.log(err)
        return err
    }
    else
    {
        console.log('Database connected')
    }
});

//Query
let query = "SELECT * FROM aim"
// let query = "INSERT INTO aim(name_aim) VALUE ('Serni')"
conn.query(query, (err, result, field) => {
    console.log(err);
    console.log(result);
    // console.log(field);

});

//Disconnect
conn.end(err => {
    if (err) {
        console.log(err)
        return err
    }
    else
    {
        console.log('Database closed')
    }
});