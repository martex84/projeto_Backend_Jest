const { factory } = require('factory-girl');

const objetoUser = require('./objetoUser.js');
const User = require('../../src/app/models/User.js');

factory.define('User', User, objetoUser)

module.exports = factory;