const { io } = require('../index');
const { checkJWT } = require('../helpers/jwt');
const { userConnected, userDisconnected} = require('../controllers/socket')

// Mensajes de Sockets
io.on('connection', (client) => {
    console.log('Cliente conectado');
 
    const [validate, uid] = checkJWT(client.handshake.headers['x-token']);
     
    if(!validate){
        return client.disconnect();
    }

    userConnected(uid);

    //Join room
    client.join(uid);
    
    client.on('message-personal',(payload) =>{
        console.log(payload);
        io.to(payload.to).emit('message-personal',payload);
    });
   
    client.on('disconnect', () => {
        userDisconnected(uid);
        console.log('Cliente desconectado');
    });

});
