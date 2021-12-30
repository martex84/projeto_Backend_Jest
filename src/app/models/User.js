const { Sequelize, Model, DataTypes } = require('sequelize');

const database = require('../../db.js');
const cryptographyPassword = require('../utils/cryptographyPassword.js')

const Users = database.define('Users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.VIRTUAL,
    password_hash: DataTypes.STRING,
    access: DataTypes.STRING
},
    {
        hooks: {
            beforeSave: async user => {
                user.password_hash = await cryptographyPassword.cryptography(user.dataValues.password);
            }
        }
    }

);

module.exports = Users;