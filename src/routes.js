const routes = require('express').Router();

const UserController = require('./app/controllers/UserController.js');
const middleAuthenticate = require('./app/middleware/authenticate.js')

routes.get('/session', async (req, res) => {
    await UserController.autenticate(req, res).then(data => {
        return data;
    })
})

routes.post('/user', async (req, res) => {
    await UserController.create(req, res).then(data => {
        return data
    })
})

//Routes Admin
routes.use(middleAuthenticate);

routes.get('/admin', async (req, res) => {
    const data = req;

    if (!req.idUser) {
        return res.status(401).send();
    }

    return res.status(200).send();
})

module.exports = routes;