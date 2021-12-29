const jsonWebToken = require('jsonwebtoken');

function sign(data) {
    const env = process.env.APP_SECRET;

    const token = jsonWebToken.sign({ id: data }, env)

    return { token };
}

module.exports = {
    sign
}