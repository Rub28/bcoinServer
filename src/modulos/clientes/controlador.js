const db = require('../../DB/mysql')

const TABLA ='clientes';

module.exports = function(dbinyectada) {

    let db = dbinyectada;

    if(!db){
        db = require('../../DB/mysql')
    }

    function todos(){
        return db.todos(TABLA)
    }
    
    function uno(id){
        return db.uno(TABLA, id);
    }
    
    function agregar(body){
        return db.agregar(TABLA, body);
    }
    
    function baja(body){
        return db.baja(TABLA, body);
    }
    function ClientesAutocomplete(query){
        return db.clientesAutocomplete(query);
    }

    function todosAgente(body){
        return db.todosAgente(TABLA, body);
    }
    return {
        todos,
        uno,
        baja,
        agregar,
        ClientesAutocomplete,
        todosAgente
    }
}