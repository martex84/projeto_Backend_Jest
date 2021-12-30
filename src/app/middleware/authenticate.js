const jsonWebToken = require('../utils/manageToken.js');

module.exports = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).send({
            message: "Token Invalid"
        })
    }

    return next();
}