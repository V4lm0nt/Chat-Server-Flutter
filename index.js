const express = require('express');

const path = require('path');
const { getUsuarios } = require('./controller/usuarios');


require('dotenv').config();

//DB config
const { dbConnection } = require('./database/config');
dbConnection();



//App de express
const app = express(); 

//Lectura y parseo del Body(es lo que viene en una peticion http)
app.use(express.json());

// Node Server

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./socket/socket.js');

// Mensajes de Sockets
//
//  io.on('connection', client => {
//
//    console.log('Cliente conectado');
//
//    client.on('disconnect', () => { 
//        console.log('Cliente desconecado'); 
//    });
//    
//    client.on('mensaje',()=>{
//        console.log('Mensaje!!')
//
//
//        io.emit('mensaje', {admin: 'Nuevo Mensaje'});
//    });
//
//    
//
//  });


// Path público

const publicPath = path.resolve( __dirname, 'public' );


app.use(express.static(publicPath));



//Mis Rutas

app.use( '/api/login', require('./routes/auth') );
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/mensajes', require('./routes/mensajes') );



server.listen( process.env.PORT, ( err )=> {
    if ( err ) throw new Error( err );

    console.log('Servidor corriendo en puerto', process.env.PORT);
});