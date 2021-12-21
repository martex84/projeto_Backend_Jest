import express from 'express';

import routes from './routes.js'

class AppControler {
    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(express.json());
    }

    routes() {
        this.express.use(routes);
    }

}

const appControler_express = new AppControler().express;

export default appControler_express;