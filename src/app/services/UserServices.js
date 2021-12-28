const User = require('../models/User.js')

class UserServices {
    async create(data) {
        const retorno = await User.create(data);
        return retorno;
    }
}

module.exports = new UserServices();