
require('dotenv')
module.exports = {
    app: {
        port: process.env.PORT || 4000
    },
    jwt:{
        secret: process.env.JET_SECRET || 'miconstraseña2848330'
    },
    mysql:{
        host: process.env.MYSQL_HOST || '127.0.0.1',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DB || 'bcoin_bd', 
        port: process.env.PORT_BD || 3306  
    }
}