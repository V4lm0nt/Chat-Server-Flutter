
const { io } = require('../index.js');

// Mensajes de Sockets

io.on('connection', client => {

    console.log('Cliente conectado');

    client.on('disconnect', () => { 
        console.log('Cliente desconecado'); 
    });
    
   // client.on('mensaje',()=>{
   //     console.log('Mensaje!!')
   //
   //     io.emit('mensaje', {admin: 'Nuevo Mensaje'});
   // });

    

});