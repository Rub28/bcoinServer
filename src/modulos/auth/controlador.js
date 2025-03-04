const db = require('../../DB/mysql')
const auth = require('../../autenticacion');

const bcrypt = require('bcryptjs')

const TABLA ='users';

module.exports = function(dbinyectada) {

    let db = dbinyectada;

    if(!db){
        db = require('../../DB/mysql')
    }

    async function login(usuario, password){
        const data = await db.login(TABLA, { user_name : usuario })
        console.log(data)
        return bcrypt.compare(password, data.user_password)
        .then(resultado =>{
            if(resultado === true){
                /// generar token
                return auth.asignarToken({...data});
            }else{
                throw new Error("Informacion Invalida")
            }
        })
    }
    
    
    return {
        login
    }
}