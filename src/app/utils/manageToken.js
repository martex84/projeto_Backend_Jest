const jsonWebToken = require('jsonwebtoken');

const env = process.env.APP_SECRET;

function sign(data) {
    const token = jsonWebToken.sign({ id: data }, env)

    return { token };
}

function verify(token) {
    return new Promise((resolve) => {
        resolve(jsonWebToken.verify(token, env))
    })
}

module.exports = {
    sign,
    verify
}