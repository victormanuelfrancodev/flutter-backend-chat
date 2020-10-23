const express = require('express');
const path = require('path');
require('dotenv').config();

// App de Express
const app = express();

// Lectura y parseo del body
app.use( express.json());

//Db config
const { dbConnection } = require('./database/config');
dbConnection();

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');


//Mis rutas 
app.use('/api/login', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

// Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );





server.listen( process.env.PORT, ( err ) => {

    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT );

});


