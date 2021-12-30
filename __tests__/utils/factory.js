const { factory } = require('factory-girl');

const User = require('../../src/app/models/User.js');

factory.define('User', User, {})

module.exports = factory;