const db = require('../../DB/mysql')
const bcrypt = require('bcryptjs')

const TABLA = 'users';

module.exports = function (dbinyectada) {

    let db = dbinyectada;

    if (!db) {
        db = require('../../DB/mysql')
    }

    function todos(query) {
        console.log("query Todos ", query)
        if (query.roluser === "ADMIN") {
            return db.todos(TABLA, query)
        }
        if (query.roluser === "AGENTE") {
            return db.UsuariosAgente(TABLA, query)
        }
    }

    function uno(id) {
        return db.uno(TABLA, id);
    }

    async function agregar(body) {

        if(esHashBcrypt(body.user_password) == false){
            body.user_password = await bcrypt.hash(body.user_password, 5);
        }        
        return await db.agregar(TABLA, body);
    }

    function baja(body) {
        return db.baja(TABLA, body);
    }

    function validaUsuario(body) {
        return db.validaUsuario(TABLA, body);
    }

    function esHashBcrypt(hash) {
        const regex = /^\$2[ayb]\$([0-9]{2})\$.{53}$/;
        return regex.test(hash);
      }

    return {
        todos,
        uno,
        baja,
        agregar,
        validaUsuario
    }
}