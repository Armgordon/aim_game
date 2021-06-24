// IMPORTS
import express from 'express';
import path from 'path'
import mysql from 'mysql'

//создаем апку
const app = express()


//config
const conn = mysql.createConnection( {
    host: 'localhost',
    user: 'newuser',
    password: 'password',
    database: 'leaderboard'
})

//REQUIRES
// const express = require('express')
// const mysql = require('mysql')
// const path = require('path')



//Pathname for imports
const __dirname = path.resolve()
//Берем порт из переменной, либо используем 3000
const PORT = process.env.PORT ?? 3000



//Make pool
const pool = mysql.createConnection({
    host: 'localhost',
    user: 'newuser',
    database: 'leaderboard',
    password: 'password'
})




pool.connect(err => {
    if (err) {
        console.log(err)
        return err
    }
    else
    {
        console.log('Database connected')
    }
});


app.get("/", (req, res) => {

    // pool.query('SELECT * FROM aim').then(function (data) {
    //     res.json(data)
    // })


    pool.query('SELECT * FROM aim', (err, result, field) => {
        console.log(err);
        console.log(result);

        res.send(`
            <!doctype html>
            <html lang="ru">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport"
                      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                <title>Leaderbord</title>
            </head>
            <body>
                ${result.map(result=> `<li>${result["name_aim"]}</li>`).join(" ")}            
            </body>
            </html>`
        )

        console.log(result.map(result=> `${result["name_aim"]}`))
        // Ответ в дате.
        // res.json(result)
        // console.log(field);
    })

    // res.send('Server is working...')

})





app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
})



// //config
// const conn = mysql.createConnection( {
//     host: 'localhost',
//     user: 'newuser',
//     password: 'password',
//     database: 'leaderboard'
// })
// //Connect
// conn.connect( err => {
//     if (err) {
//         console.log(err)
//         return err
//     }
//     else
//     {
//         console.log('Database connected')
//     }
// });
//
// //Query
// let query = "SELECT * FROM aim"
// // let query = "INSERT INTO aim(name_aim) VALUE ('Serni')"
// conn.query(query, (err, result, field) => {
//     console.log(err);
//     console.log(result);
//     // console.log(field);
//
// });
//
//
// //Disconnect
// conn.end(err => {
//     if (err) {
//         console.log(err)
//         return err
//     }
//     else
//     {
//         console.log('Database closed')
//     }
// });