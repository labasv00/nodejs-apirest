var express = require('express');
var cors = require('cors');
//añadimos mongoose
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
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
app.get('/devices', function (req, res) {
    res.json({
        msg: 'el API REST funciona!'
    });
});

//peticion GET para obtener los datos de un dispositivo por su tipo
app.get('/devices/:type', async (req, res) => {
    try {
        console.log(JSON.stringify(req.params, null, 2));
        // Realiza la búsqueda con un filtro, por ejemplo, {"type": "temperature"}
    const devices = await Device.find(req.params).exec();
    res.json(devices);
} catch (err) {
    res.status(500).json({
        msg: 'Error al buscar dispositivos',
        error: err
    });
}
});

app.post('/devices', async function (req, res) {
    try {
        // Creamos un nuevo dispositivo con los datos del request
        var device = new Device(req.body);
        // Guardamos el dispositivo en la base de datos usando await para esperar la promesa
        await device.save();
        console.log("device guardado");
        console.log(device);
        res.status(200).json({
            msg: 'Dispositivo guardado correctamente',
            device: device
        });
    } catch (err) {
        res.status(500).json({
            msg: 'Error al guardar el dispositivo',
            error: err
        });
    }
});

//Peticion PUT para atualizar los datos de un dispositivo
app.put('/devices/:_id', async (req, res) => {
    try {
        // Busca el dispositivo por type y lo actualiza con los datos del request
        // Una mejor opcion es usar "ID" se usa findByIdAndUpdate,
        const device = await Device.findByIdAndUpdate(req.params, req.body).exec();
        res.json({
            msg: 'Dispositivo actualizado correctamente',
            device: device
        });
    } catch (err) {
        res.status(500).json({
            msg: 'Error al actualizar el dispositivo',
            error: err
        });
    }
});

//Peticion DELETE para borrar un dispositivo
app.delete('/devices/:_id', async (req, res) => {
    try {
        console.log(JSON.stringify(req.params, null, 2));
        // Busca el dispositivo por type y lo borra
        const device = await Device.findByIdAndDelete(req.params).exec();
        res.json({
            msg: 'Dispositivo borrado correctamente',
            device: device
        });
    } catch (err) {
        res.status(500).json({
            msg: 'Error al borrar el dispositivo',
            error: err
        });
    }
});

// app.listen para arrancar el servidor web con express en el puerto 3000
app.listen(port, function () {
    console.log('Servidor node.js corriendo en el puerto ' + port);
});