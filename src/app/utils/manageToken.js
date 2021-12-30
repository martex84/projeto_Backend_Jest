const jsonWebToken = require('jsonwebtoken');

const env = process.env.APP_SECRET;

function sign(data) {
    const token = jsonWebToken.sign({ id: data }, env)

    return { token };
}

function verify(token) {
    return new Promise((resolve) => {
        let value;

        try {
            value = jsonWebToken.verify(token, env);
            resolve(value);
        } catch (error) {
            console.log(error.message)
            resolve({
                message: error.message,
                value: false
            });
        }
    })
}

module.exports = {
    sign,
    verify
}