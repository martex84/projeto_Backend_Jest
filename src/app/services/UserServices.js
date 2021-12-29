const User = require('../models/User.js')

class UserServices {
    async create(data) {
        const retorno = await User.create(data);

        return retorno;
    }

    async autenticate(data) {
        const { email } = data;

        const returno = await User.findOne({
            where: {
                email: email
            }
        });

        return returno;
    }
}

module.exports = new UserServices();