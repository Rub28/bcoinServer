require ('dotenv').config();  

const  mysql = require('mysql2');  


const conneection = mysql.createConnection( { 
    host:  process.env.BD_HOST,  // 'localhost', 
    user:  process.env.BD_USER, //  'root', 
    password: process.env.DB_PASSWORD, //  'rub11..',  
    database: process.env.DB_NAME // 'bcoin_bd' 

});  

conneection.connect ((err) => {
    if(err)  { 
        console.error ('error en base de datos', err); 
            return; 
    }

    console.log(' Conexion exitosa en BD')

});  

conneection.end(); 

module.exports = conneection; 

