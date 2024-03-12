const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.get('/devices', function (req, res) {
    res.json({
        msg: 'el API REST funciona!'
    });
});
app.listen(port, function () {
    console.log('Servidor node.js corriendo en el puerto ' + port);
});