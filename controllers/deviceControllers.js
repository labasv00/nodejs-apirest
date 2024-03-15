const Device = require('../models/device');
var sanitize = require('mongo-sanitize');

exports.deleteDevice = async (req, res) => {
    try {

        const clean_params = sanitize(req.params)
        const device = await Device.findByIdAndDelete({
            _id: clean_params.id
        }).exec();
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
};
exports.getDevices = (req, res) => {
    res.json({
        msg: 'el API REST funciona!'
    });
    mqttBroker.publish('presence', 'devices');
};
exports.createDevice = async (req, res) => {
    try {
        const clean_body = sanitize(req.body)
        var device = new Device(clean_body);
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
};
exports.getDeviceByType = async (req, res) => {
    try {
        console.log(JSON.stringify(req.params, null, 2));
        const clean_params = sanitize(req.params)
        const devices = await Device.find(clean_params).exec();
        res.json(devices);
    } catch (err) {
        res.status(500).json({
            msg: 'Error al buscar dispositivos',
            error: err
        });
    }
};
exports.updateDeviceById = async (req, res) => {
    try {
        const clean_body = sanitize(req.body)
        const clean_params = sanitize(req.params)
        const device = await Device.findByIdAndUpdate({
                _id: clean_params.id
            },
            clean_body).exec();
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
};
exports.findDevices = async (req, res) => {
    try {
        //console.log(JSON.stringify(req.body, null, 2));
        const clean_body = sanitize(req.body)
        const devices = await Device.find(clean_body).exec();
        res.json(devices);
    } catch (err) {
        res.status(500).json({
            msg: 'Error al buscar dispositivos'
        });
    }
};