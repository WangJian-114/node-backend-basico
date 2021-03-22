
const express = require('express');
const { dbConnection } = require('../DB/config');
const app = express();
var cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion

        this.routes();
    }

    async conectarDB() {
        await dbConnection(); 
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // lectura y Parseo del body
        this.app.use(express.json());


        // Directorio publico
        this.app.use( express.static('public'));


    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/user'));

    }

    listen() {
        this.app.listen(this.port, ()=>{
            console.log('Escuchando en el puerto ', this.port);
        });
    }

}

module.exports = Server;