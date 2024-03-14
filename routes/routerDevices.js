const express = require('express');
const middleware = require('../auth/middleware');
const deviceControllers = require('../controllers/deviceControllers');
const router = express.Router();
// GET request to /devices
router.get('/', function (req, res) {
    res.json({
        msg: 'el API REST funciona!'
    });
    mqttBroker.publish('presence', 'devices');
});
// POST request to /devices
router.post('/', deviceControllers.createDevice);
// GET request to /devices/:type
router.get('/:type', middleware.ensureAuthenticated,
    deviceControllers.getDeviceByType);
// PUT request to /devices/:type
router.put('/:type', deviceControllers.updateDeviceByType);
// DELETE request to /devices/:type
router.delete('/:type', deviceControllers.deleteDevice);
// POST request to /devices/find
router.post('/find', deviceControllers.findDevices);
module.exports = router; 