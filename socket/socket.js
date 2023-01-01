
const { io } = require('../index.js');

const { comprobarJWT } = require('../helpers/jwt.js');

const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controller/socket');
// Mensajes de Sockets

io.on('connection', client => {
    //console.log(  client.handshake.headers['x-token']);
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
    
    //Verificar autenticacion
    if(!valido){return client.disconnect();}
    
    //cliente autenticado
    usuarioConectado(uid);

    //ingresar al usuario a una sala en particular
    //sala global, client.id, 638f8ca09b039d253299c95b(Franco Piola)

    client.join(uid);

    //Escuchar del cliente el 'mensaje-personal'

    client.on('mensaje-personal',async(payload)=>{
        
        //TODO: Grabar mensaje
        await grabarMensaje(payload);

        io.to( payload.para ).emit( 'mensaje-personal' , payload );
    
    });


    client.on('disconnect', () => { 
        usuarioDesconectado(uid);
        //console.log('Cliente desconecado'); 
    });







    
    
   // client.on('mensaje',()=>{
   //     console.log('Mensaje!!')
   //
   //     io.emit('mensaje', {admin: 'Nuevo Mensaje'});
   // });

    

});