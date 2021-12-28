const UserServices = require('../services/UserServices.js')

class UserController {
    async store(req, res) {

    }

    async create(req, res) {
        return await UserServices.create(req);
    }
}

module.exports = new UserController();