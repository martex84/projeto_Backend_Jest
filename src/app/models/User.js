const { Sequelize, Model, DataTypes } = require('sequelize');
const database = require('../../db.js')

const Users = database.define('Users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING
});

module.exports = Users;