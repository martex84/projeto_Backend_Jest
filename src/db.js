require('dotenv').config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

const { Sequelize } = require('sequelize'); /*Importa a dependência responsável 
por administrar o banco de dados*/

const sequelize = new Sequelize( //Passa as configurações
    process.env.DB_NAME, //Nome Banco
    process.env.DB_USER, //Usuario
    process.env.DB_PASS, //Senha
    {
        dialect: process.env.DB_DIALECT || "postgres", //Tipo Banco
        host: process.env.DB_HOST, //Host
        port: 3306 //Porta Conexao
    }
);

module.exports = sequelize;