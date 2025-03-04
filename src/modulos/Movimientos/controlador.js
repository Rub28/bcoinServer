const db = require('../../DB/mysql')

const TABLA ='movimientos';

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

    
    function Movimientos(body){
        console.log("body", body)
        return db.Movimientos(TABLA, body)
    }
    
    function query(body){
        return db.query(TABLA, body);
    }
    
    
    function hitMaximo(body){
        return db.hitMaximo(TABLA, body);
    }
    
    
    return {
        todos,
        uno,
        baja,
        agregar,
        Movimientos, 
        query, 
        hitMaximo  
    }
}