const routes = require('express').Router();

const UserController = require('./app/controllers/UserController.js')

routes.post('/sessions', (req, res) => {


    UserController.store()
})

routes.post('/user', async (req, res) => {
    await UserController.create(req.body).then(data => {
        const { name, email, password_hash } = data.dataValues;
        res.json({
            name,
            email,
            password_hash
        });
    })
})

module.exports = routes;