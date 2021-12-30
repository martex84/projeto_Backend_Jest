const jsonWebToken = require('jsonwebtoken');

const env = process.env.APP_SECRET;

function sign(data) {
    const token = jsonWebToken.sign({ id: data }, env)

    return { token };
}

async function decode(data) {
    const value = await jsonWebToken.decode(data.token, env);

    return value;
}

module.exports = {
    sign,
    decode
}