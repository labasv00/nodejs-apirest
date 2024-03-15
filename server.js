var express = require('express');
var cors = require('cors');

var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// MQTT
const mqttBroker = require('./services/broker');

// Routes
var deviceRoutes = require('./routes/routerDevices');
var authCtrl = require('./auth/auth');
var middleware = require('./auth/middleware');

//añadimos el modelo
var Device = require('./models/device');
var app = express();
var port = 3000;
var database = 'mongodb://localhost:27017/demoAPIREST';
mongoose.connect(database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexion:'));
db.once('open', function () {
    console.log('Conectado a la base de datos');
});
app.use(bodyParser.urlencoded({extended: true}));
// configuramos par obtener datos en formato json
app.use(bodyParser.json());
//permite el acceso a la API desde cualquier origen


//api rest devices
app.use('/devices', deviceRoutes);

app.post('/auth/login', authCtrl.aliasLogin);


// app.listen para arrancar el servidor web con express en el puerto 3000
app.listen(port, function () {
    console.log('Servidor node.js corriendo en el puerto ' + port);
});

mqttBroker.startBroker();