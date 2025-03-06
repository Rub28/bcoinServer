const mysql = require('mysql');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    pw: config.mysql.password,
    database: config.mysql.database 
}

let conexion;

function conexiondb() {
    conexion = mysql.createConnection(dbconfig);
    conexion.connect((err) => {
        if (err) {
            console.log('[db err]', err)
            setTimeout(conexiondb, 200)
        } else {
            console.log('db conectado')
        }
    })
    conexion.on('error', err => {
        console.log('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            conexiondb();
        } else {
            throw err;
        }

    })
}

conexiondb();

function todos(tabla, query) {
    console.log("Todos ",  tabla ); 
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} where estatus = ? `,query.estatus , (error, result) => {
            return error ? reject(error) : resolve(result);
        }) 
    })
}

function uno(tabla, id) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} where id=${id}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
}

function insertar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ?`, data, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
}
function actualizar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET ? where id = ?`, [data, data.id], (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
}
function agregar(tabla, data) {
    console.log('data --> ', data)
    if (data && data.id == 0) {
        return insertar(tabla, data);
    } else {
        return actualizar(tabla, data);
    }
}

function baja(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET estatus = ? where id = ?`, [data.estatus,data.id], (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
}

function query(tabla, consulta) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}  where ?`, consulta, (error, result) => {
            return error ? reject(error) : resolve(result[0]);
        })
    })
}

function hitMaximo (tabla, consulta) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT max(num_hit) as num_hit FROM ${tabla}  where ?`, consulta, (error, result) => {
            return error ? reject(error) : resolve(result[0]);
        })
    })
}

function Movimientos(tabla, data) {
    if (data.roluser === "AGENTE") {
        return new Promise((resolve, reject) => {
            conexion.query(` SELECT M.id, c.id as Id_cliente, M.num_hit, nom_cliente, monto_entrada, fecha_entrada, valor_bcoin, precio_inicial, precio_final, m.monto_salida, m.fecha_salida, m.utilidad_perdida, m.estatus, m.num_round, m.notas, C.id_agente, concat(u.firt_name,' ',u.second_name) NombreAgente FROM  movimientos AS M
	INNER JOIN  clientes AS C
		ON  M.id_cliente = c.id
	INNER JOIN users AS U
		ON  M.id_agente = u.id
        WHERE M.estatus = ? AND C.id_agente = ?`, [data.estatus, data.id_agente], (error, result) => {
                return error ? reject(error) : resolve(result);
            })
        })
    }
    if (data.roluser === "ADMIN") {
        return new Promise((resolve, reject) => {
            conexion.query(` SELECT M.id, c.id as Id_cliente, M.num_hit,  nom_cliente, monto_entrada, fecha_entrada, valor_bcoin, precio_inicial, precio_final, m.monto_salida, m.fecha_salida, m.utilidad_perdida, m.estatus, m.num_round, m.notas, C.id_agente, concat(u.firt_name,' ',u.second_name) NombreAgente FROM  movimientos AS M
	INNER JOIN  clientes AS C
		ON  M.id_cliente = c.id
	INNER JOIN users AS U
		ON  M.id_agente = u.id
        WHERE M.estatus = ? `,data.estatus , (error, result) => {
                return error ? reject(error) : resolve(result);
            })
        })
    }
    if (data.roluser === "CLIENTE") {
        return new Promise((resolve, reject) => {
            conexion.query(` SELECT M.id, c.id as Id_cliente, M.num_hit,  nom_cliente, monto_entrada, fecha_entrada, valor_bcoin, precio_inicial, precio_final, m.monto_salida, m.fecha_salida, m.utilidad_perdida, m.estatus, m.num_round, m.notas, C.id_agente FROM  movimientos AS M
	INNER JOIN  clientes AS C
		ON  M.id_cliente = c.id 
        WHERE M.estatus = "A" AND C.id = ? `, data.id_agente, (error, result) => {
                return error ? reject(error) : resolve(result);
            })
        })
    }
}

function clientesAutocomplete(query) {
    const termino = query.query;
    let consultas = "";
    if (query.roluser === 'ADMIN') {
        consultas = 'SELECT id, nom_cliente FROM clientes WHERE  nom_cliente LIKE ?';
        return new Promise((resolve, reject) => {
            conexion.query(consultas, [`%${termino}%`], (error, result) => {
                return error ? reject(error) : resolve(result);
            })
        })
    }
    if (query.roluser === 'AGENTE') {
        consultas = 'SELECT id, nom_cliente FROM clientes WHERE id_agente = ? and nom_cliente LIKE ?';
        return new Promise((resolve, reject) => {
            conexion.query(consultas, [query.id_agente, `%${termino}%`], (error, result) => {
                return error ? reject(error) : resolve(result);
            })
        })
    }


}

function todosAgente(tabla, data) {
    if (data.roluser === "ADMIN") {
        return new Promise((resolve, reject) => {
            conexion.query(`SELECT * FROM ${tabla} where estatus = ? `,data.estatus, (error, result) => {
                return error ? reject(error) : resolve(result);
            })
        })
    }
    if (data.roluser === "AGENTE") {
        return new Promise((resolve, reject) => {
            conexion.query(`SELECT * FROM ${tabla} where estatus = ? and id_agente = ?`, [data.estatus, data.id_agente], (error, result) => {
                return error ? reject(error) : resolve(result);
            })
        })
    }
}

function UsuariosAgente(tabla, data) {
    console.log("data", data)
    if (data.roluser === "ADMIN") {
        return new Promise((resolve, reject) => {
            conexion.query(`select u.*,  c.nom_cliente from users AS u
	LEFT JOIN  clientes as c
     on  u.id_cliente = c.id
    where U.ESTATUS = ?`, data.estatus,  (error, result) => {
                return error ? reject(error) : resolve(result);
            })
        })
    }

    if (data.roluser === "AGENTE") {
        return new Promise((resolve, reject) => {
            conexion.query(`select u.*,  c.nom_cliente from users AS u
	INNER JOIN  clientes as c
     on  u.id_cliente = c.id
    where c.id_agente = ? and U.ESTATUS = ?`, [data.id_agente, data.estatus], (error, result) => {
                return error ? reject(error) : resolve(result);
            })
        })
    }
}

function validaUsuario(tabla, data) {
    console.log("data", data)
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT user_name,email, phone_number  FROM ${tabla} where user_name= ? or email = ? or phone_number = ?`, [data.user_name, data.email, data.phone_number], (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
}

function login(tabla, consulta) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT id, user_password, user_name, rol_user, id_cliente  FROM ${tabla}  where ?`, consulta, (error, result) => {
            return error ? reject(error) : resolve(result[0]);
        })
    })
}

module.exports = {
    todos,
    uno,
    agregar,
    baja,
    query,
    Movimientos,
    clientesAutocomplete,
    todosAgente,
    UsuariosAgente,
    validaUsuario,
    login, 
    hitMaximo 
}