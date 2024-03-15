const aedes = require('aedes')();
const net = require('net');
const http = require('http');
const ws = require('websocket-stream');
const User = require('../models/user');

const mqttPort = 1883;
const wsPort = 8888;
const MqttServer = net.createServer(aedes.handle);
const WsServer = http.createServer();
// Configurar el servidor WebSocket para trabajar con Aedes
ws.createServer({server: WsServer}, aedes.handle);

aedes.authenticate = async function (client, username, password, callback) {
    try {
        const user = await User.findOne({alias: username, pass: password})

        if (!user) {
            console.log("Failed to authenticate: " + username)
            callback(null, false)
        }

        console.log("Access granted to: " + user.alias + " (" + user._id + ")")
        callback(null, true)

    } catch (err) {
        console.log("Failed to authenticate: " + username)
        callback(null, false)
    }

}

//mostrar por consola cada vez que se publica un mensaje
aedes.on('publish', function (packet, client) {
    if (client) {
        console.log(' - Message Published: ', packet.topic);
    }
});
//mostrar por consola cada vez que se desconecta un cliente
aedes.on('clientDisconnect', function (client) {
    console.log(' - Client Disconnected: ', client.id);
});
//mostrar por consola cada vez que se conecta un cliente
aedes.on('client', function (client) {
    console.log(' - New Client: ', client.id);
});
//mostrar por consola cada vez que se suscribe un cliente
aedes.on('subscribe', function (subscriptions, client) {
    console.log(' - Client Subscribed:', subscriptions);
});

module.exports = {
    startBroker: function () {
        MqttServer.listen(mqttPort, function () {
            console.log('Servidor MQTT en el puerto', mqttPort);
        });
        WsServer.listen(wsPort, function () {
            console.log('Envío de mensajes MQTT por WebSocket puerto', wsPort);
        });
    },
//funcion para publicar
    publish: function (topic, message) {
        aedes.publish({topic: topic, payload: message});
    },
//funcion para suscribirse
    subscribe: function (topic) {
        aedes.subscribe(topic, function () {
            console.log(' - Client suscribed to:', topic);
        });
    }
};