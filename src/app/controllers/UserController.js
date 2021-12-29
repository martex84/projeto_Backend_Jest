const UserServices = require('../services/UserServices.js')
const cryptography = require('../utils/cryptographyPassword.js')

class UserController {
    async autenticate(req) {
        const body = req.body;

        return await UserServices.autenticate(body).then(async data => {
            let decryptionPassword = null;

            if (data !== null) {
                const { password_hash } = data.dataValues;

                decryptionPassword = await cryptography.decipher(body.password, password_hash);
            }

            if (!decryptionPassword) return {
                status: 404,
                message: 'Email or Password Incorrect!'
            }

            return decryptionPassword;
        })
    }

    async create(req) {
        return await UserServices.create(req);
    }
}

module.exports = new UserController();