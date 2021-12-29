const res = require('express/lib/response');
const UserServices = require('../services/UserServices.js')
const cryptography = require('../utils/cryptographyPassword.js')

class UserController {
    async autenticate(req, res) {
        const body = req.body;

        return await UserServices.autenticate(body).then(async data => {
            let decryptionPassword = null;

            if (data !== null) {
                const { password_hash } = data.dataValues;

                decryptionPassword = await cryptography.decipher(body.password, password_hash);
            }

            if (!decryptionPassword) return res.status(401).json({
                message: 'Email or Password Incorrect!'
            })

            return res.status(200).send(decryptionPassword);
        })
    }

    async create(req, res) {
        return await UserServices.create(req.body).then(data => {
            const { name, email, password_hash } = data.dataValues;

            return res.status(200).json({
                name,
                email,
                password_hash
            })
        })
    }
}

module.exports = new UserController();