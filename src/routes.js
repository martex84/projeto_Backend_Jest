const routes = require('express').Router();

const UserController = require('./app/controllers/UserController.js')

routes.get('/session', async (req, res) => {
    await UserController.autenticate(req, res).then(data => {
        return data;
    })
})

routes.get('/admin', async (req, res) => {
    const data = req;
    debugger;
    return res.status(401).send();
})

routes.post('/user', async (req, res) => {
    await UserController.create(req, res).then(data => {
        return data
    })
})

module.exports = routes;