var http= require('http');
const puerto = 9000;
const host = '127.0.0.1';
//como parametro de crate server hay un callback con dos argumentos, pregunta/ respuesta
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    // en req.url viene la ruta que se esta solicitando
    res.end('Servidor node funcionando en ' + host + ':' + puerto + req.url
        + '\n');
}).listen(puerto, host, function(){
    //mostrar por consola que el servidor esta corriendo
    console.log('Servidor node corriendo en ' + host + ':' + puerto);
});