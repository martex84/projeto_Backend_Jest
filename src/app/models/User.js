const { Sequelize, Model, DataTypes } = require('sequelize');
const database = require('../../db.js')

const User = database.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING
});

module.exports = User;