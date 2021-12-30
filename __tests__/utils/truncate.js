const db = require('../../src/db.js');
const Users = require('../../src/app/models/User');

module.exports = async () => {
    return Promise.all(
        Object.keys(db.models).map(key => { /* Recebe os modelos do banco de dados */
            const retorno = Users.destroy({ /* Realiza a exclusão dos modelos */
                //Forca a exclusão
                truncate: true,
                force: true
            })
            return retorno;
        })
    )
}