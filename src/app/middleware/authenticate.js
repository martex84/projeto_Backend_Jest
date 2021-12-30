const jsonWebToken = require('../utils/manageToken.js');

module.exports = async (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).send({
            message: "Token Invalid"
        })
    }

    const [, token] = authorization.split(' ');

    const decode = await jsonWebToken.verify(token);

    if (decode.message) {
        return res.status(401).send({
            message: "Token Invalid"
        })
    }

    req.idUser = decode.id;

    return next();
}