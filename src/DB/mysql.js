const mysql = require('mysql2/promise');
const config = require('../config');

let conexion; 

async function conexiondb() {
    let conexion;  // Definimos la variable de conexión fuera del try-catch
    try {
        // Crear un pool de conexiones
        const pool = mysql.createPool({
            host: config.mysql.host,
            user: config.mysql.user,
            password: config.mysql.password, 
         //   port: 3306, 
            port: config.mysql.port, 
            database: config.mysql.database,
            namedPlaceholders: true
        });
        console.log(" host : ", config.mysql.host); 
        // Obtener una conexión del pool
        conexion = await pool.getConnection();

        console.log(" DB conectada, ok ");
        return conexion;

    } catch (err) {
        console.error('Error al conectar a la base de datos --> ', err);
    } finally {
        // Asegurarse de liberar la conexión si se ha establecido
        if (conexion) {
            conexion.release();
            console.log("Conexión liberada");
        }
    }
}

// Llamar a la función
conexiondb().then(conexion => {
    // Puedes usar la conexión para realizar consultas si la necesitas
}).catch(err => {
    console.error('Error:', err);
});

conexiondb();
/*
function todos(tabla) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} where estatus = 'A'`, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
}*/

async function todos(tabla) {
    let conexion;
    try {
        // Obtener la conexión desde el pool
        conexion = await conexiondb();

        // Realizar la consulta usando async/await y execute
        const [result] = await conexion.execute(
            `SELECT * FROM ${tabla} WHERE estatus = ?`,
            ['A']  // Parámetro 'A' para el estatus activo
        );

        // Retornar los resultados de la consulta
        return result;

    } catch (error) {
        console.error("Error en la consulta:", error);
        throw error; // Lanzar el error para que lo maneje el bloque llamante

    } finally {
        // Liberar la conexión después de la consulta
        if (conexion) {
            conexion.release();
            console.log("Conexión liberada.");
        }
    }
}


function uno(tabla, id) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} where id=${id}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
}
/*
function insertar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ?`, data, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
}*/

async function insertar(tabla, data) {
    let conexion;
    try {
        // Obtener la conexión desde el pool
        conexion = await conexiondb();

        // Ejecutar la consulta de inserción usando placeholders con nombre
        const [result] = await conexion.execute(
            `INSERT INTO ${tabla} SET ${Object.keys(data).map(key => `${key} = :${key}`).join(', ')}`,
            data // Pasar el objeto directamente, ya que estamos usando placeholders con nombre
        );

        // Retornar el resultado de la inserción
        return result;

    } catch (error) {
        console.error("Error al insertar los datos:", error);
        throw error; // Lanzamos el error para que lo maneje el bloque llamante

    } finally {
        // Liberar la conexión si se obtuvo
        if (conexion) {
            conexion.release();
            console.log("Conexión liberada tras la inserción");
        }
    }
}


/*
function actualizar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET ? where id = ?`, [data, data.id], (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
}*/

async function actualizar(tabla, data) {
    let conexion;
    try {
        // Obtener la conexión desde el pool
        conexion = await conexiondb();

        // Ejecutar la consulta de actualización usando placeholders con nombre
        const [result] = await conexion.execute(
            `UPDATE ${tabla} SET ${Object.keys(data).map(key => `${key} = :${key}`).join(', ')} WHERE id = :id`, 
            data  // Pasar el objeto directamente
        );

        // Retornar el resultado de la actualización
        return result;

    } catch (error) {
        console.error("Error al actualizar los datos:", error);
        throw error; // Lanzamos el error para que lo maneje el bloque llamante

    } finally {
        // Liberar la conexión si se obtuvo
        if (conexion) {
            conexion.release();
            console.log("Conexión liberada tras la actualización");
        }
    }
}

function agregar(tabla, data) {
    console.log('data', data)
    if (data && data.id == 0) {
        return insertar(tabla, data);
    } else {
        return actualizar(tabla, data);
    }
}
/*
function baja(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET estatus = ? where id = ?`, [data.estatus, data.id], (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
}*/

async function baja(tabla, consulta) {
    let conexion;
    try {
        // Obtener la conexión desde el pool
        conexion = await conexiondb();

        // Asegurarse de que consulta es un objeto con propiedades como 'user_name' y 'user_password'
        console.log("consulta", consulta)

        const parametros = [consulta.estatus, consulta.id];
        console.log("parametros", parametros)
        // Ejecutar la consulta usando los parámetros en un array
        const [result] = await conexion.execute(
            `UPDATE ${tabla} SET estatus = ? where id = ?`,
            parametros // Pasar los parámetros como un array
        );

        // Retornar el primer resultado (suponiendo que solo hay uno)
        return result || null; // Si no hay coincidencias, se devuelve null

    } catch (error) {
        console.error("Error en el login:", error);
        throw error; // Lanzamos el error para que lo maneje el bloque llamante

    } finally {
        // Liberar la conexión si se obtuvo
        if (conexion) {
            conexion.release();
            console.log("Conexión liberada tras baja");
        }
    }
}
/*
function query(tabla, consulta) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}  where ?`, consulta, (error, result) => {
            return error ? reject(error) : resolve(result[0]);
        })
    })
}*/

async function query(tabla, consulta) {
    let conexion;
    try {
        // Obtener la conexión desde el pool
        conexion = await conexiondb();

        // Realizar la consulta utilizando placeholders con nombre
        const [result] = await conexion.execute(
            `SELECT * FROM ${tabla} WHERE ?`, 
            consulta  // Aquí 'consulta' es un objeto que se mapea directamente
        );

        // Retornar el primer resultado si existe
        return result.length > 0 ? result : null;

    } catch (error) {
        console.error("Error en la consulta:", error);
        throw error; // Lanzar el error para que lo maneje el bloque llamante

    } finally {
        // Liberar la conexión después de la consulta
        if (conexion) {
            conexion.release();
            console.log("Conexión liberada.");
        }
    }
}


/*
function Movimientos(tabla, data) {
    if (data.roluser === "AGENTE") {
        return new Promise((resolve, reject) => {
            conexion.query(` SELECT M.id, c.id as Id_cliente, nom_cliente, monto_entrada, fecha_entrada, valor_bcoin, precio_inicial, precio_final, m.monto_salida, m.fecha_salida, m.utilidad_perdida, m.estatus, m.num_round, m.notas, C.id_agente, concat(u.firt_name,' ',u.second_name) NombreAgente FROM  movimientos AS M
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
            conexion.query(` SELECT M.id, c.id as Id_cliente, nom_cliente, monto_entrada, fecha_entrada, valor_bcoin, precio_inicial, precio_final, m.monto_salida, m.fecha_salida, m.utilidad_perdida, m.estatus, m.num_round, m.notas, C.id_agente, concat(u.firt_name,' ',u.second_name) NombreAgente FROM  movimientos AS M
	INNER JOIN  clientes AS C
		ON  M.id_cliente = c.id
	INNER JOIN users AS U
		ON  M.id_agente = u.id
        WHERE M.estatus = ? `, data.estatus, (error, result) => {
                return error ? reject(error) : resolve(result);
            })
        })
    }
    if (data.roluser === "CLIENTE") {
        return new Promise((resolve, reject) => {
            conexion.query(` SELECT M.id, c.id as Id_cliente, nom_cliente, monto_entrada, fecha_entrada, valor_bcoin, precio_inicial, precio_final, m.monto_salida, m.fecha_salida, m.utilidad_perdida, m.estatus, m.num_round, m.notas, C.id_agente FROM  movimientos AS M
	INNER JOIN  clientes AS C
		ON  M.id_cliente = c.id 
        WHERE M.estatus = 'A' AND C.id `, data.Id_cliente, (error, result) => {
                return error ? reject(error) : resolve(result);
            })
        })
    }
}*/

async function Movimientos(tabla, data) {
    let conexion;
    try {
        // Obtener la conexión desde el pool
        conexion = await conexiondb();

        // Acción para el rol "AGENTE"
        if (data.roluser === "AGENTE") {
            const [result] = await conexion.execute(
                ` SELECT M.id, c.id as Id_cliente, M.num_hit, nom_cliente, monto_entrada, fecha_entrada, valor_bcoin, precio_inicial, precio_final, m.monto_salida, m.fecha_salida, m.utilidad_perdida, m.estatus, m.num_round, m.notas, C.id_agente, concat(u.firt_name,' ',u.second_name) NombreAgente FROM  movimientos AS M
	INNER JOIN  clientes AS C
		ON  M.id_cliente = c.id
	INNER JOIN users AS U
		ON  M.id_agente = u.id
        WHERE M.estatus = ? AND C.id_agente = ?`, 
                [data.estatus, data.id_agente]
            );
            return result;
        }

        // Acción para el rol "ADMIN"
        if (data.roluser === "ADMIN") {
            const [result] = await conexion.execute(
                ` SELECT M.id, c.id as Id_cliente, M.num_hit, nom_cliente, monto_entrada, fecha_entrada, valor_bcoin, precio_inicial, precio_final, m.monto_salida, m.fecha_salida, m.utilidad_perdida, m.estatus, m.num_round, m.notas, C.id_agente, concat(u.firt_name,' ',u.second_name) NombreAgente FROM  movimientos AS M
	INNER JOIN  clientes AS C
		ON  M.id_cliente = c.id
	INNER JOIN users AS U
		ON  M.id_agente = u.id
        WHERE M.estatus = ? `,
                [data.estatus]  // Asumimos que un ADMIN puede consultar todos los agentes con el estatus dado
            );
            return result;
        }

        // Acción para el rol "CLIENTE"
        if (data.roluser === "CLIENTE") {
            const [result] = await conexion.execute(
                ` SELECT M.id, c.id as Id_cliente, M.num_hit, nom_cliente, monto_entrada, fecha_entrada, valor_bcoin, precio_inicial, precio_final, m.monto_salida, m.fecha_salida, m.utilidad_perdida, m.estatus, m.num_round, m.notas, C.id_agente FROM  movimientos AS M
	INNER JOIN  clientes AS C
		ON  M.id_cliente = c.id 
        WHERE M.estatus = 'A' AND C.id `,
                [data.estatus, data.id_cliente]  // Los clientes solo pueden ver sus propios movimientos
            );
            return result;
        }

        // Si el rol no es válido
        throw new Error("Rol no reconocido para realizar la consulta.");

    } catch (error) {
        console.error("Error en la consulta de movimientos:", error);
        throw error; // Lanza el error para que lo maneje el bloque llamante

    } finally {
        // Liberar la conexión
        if (conexion) {
            conexion.release();
            console.log("Conexión liberada tras la consulta.");
        }
    }
}


/*
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
}*/

async function clientesAutocomplete(query) {
    let conexion;
    try {
        // Obtener la conexión desde el pool
        conexion = await conexiondb();

        // Asegurarse de que consulta es un objeto con propiedades como 'user_name' y 'user_password'
        console.log("query", query)
        let consultas = "";
        const termino = query.query;
        if (query.roluser === "ADMIN") {
            consultas = 'SELECT id, nom_cliente FROM clientes WHERE  nom_cliente LIKE ?';
            // Ejecutar la consulta usando los parámetros en un array
            const [result] = await conexion.execute(
                consultas,
                [`%${termino}%`] // Pasar los parámetros como un array
            );

            // Retornar el primer resultado (suponiendo que solo hay uno)
            return result || null; // Si no hay coincidencias, se devuelve null
        }

        if (query.roluser === "AGENTE") {
            consultas = 'SELECT id, nom_cliente FROM clientes WHERE id_agente = ? and nom_cliente LIKE ?';
             // Ejecutar la consulta usando los parámetros en un array
             const [result] = await conexion.execute(
                consultas,
                [query.id_agente, `%${termino}%`] // Pasar los parámetros como un array
            );
             // Retornar el primer resultado (suponiendo que solo hay uno)
             return result || null; // Si no hay coincidencias, se devuelve null
        }
    } catch (error) {
        console.error("Error en el login:", error);
        throw error; // Lanzamos el error para que lo maneje el bloque llamante

    } finally {
        // Liberar la conexión si se obtuvo
        if (conexion) {
            conexion.release();
            console.log("Conexión liberada tras clientesAutocomplete");
        }
    }
}

/*
function todosAgente(tabla, data) {
    if (data.roluser === "ADMIN") {
        return new Promise((resolve, reject) => {
            conexion.query(`SELECT * FROM ${tabla} where estatus = ? `, data.estatus, (error, result) => {
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
}*/

async function todosAgente(tabla, data) {
    let conexion;
    try {
        // Obtener la conexión desde el pool
        conexion = await conexiondb();

        // Si el rol del usuario es "ADMIN"
        if (data.roluser === "ADMIN") {
            const [result] = await conexion.execute(
                `SELECT * FROM ${tabla} WHERE estatus = ?`,
                [data.estatus]  // Asegúrate de pasar 'data.estatus' como array
            );
            return result;
        }

        // Si el rol del usuario es "AGENTE"
        if (data.roluser === "AGENTE") {
            const [result] = await conexion.execute(
                `SELECT * FROM ${tabla} WHERE estatus = ? AND id_agente = ?`,
                [data.estatus, data.id_agente]  // Pasar 'data.estatus' y 'data.id_agente' como array
            );
            return result;
        }

        // Si el rol no es ni ADMIN ni AGENTE, podemos devolver un error o un resultado vacío
        throw new Error("Rol no válido para la consulta.");
    } catch (error) {
        console.error("Error en la consulta:", error);
        throw error;  // Lanzamos el error para que lo maneje el bloque llamante
    } finally {
        // Liberar la conexión si se obtuvo
        if (conexion) {
            conexion.release();
            console.log("Conexión liberada tras la consulta.");
        }
    }
}


/*
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
}*/

async function UsuariosAgente(tabla, consulta) {
    let conexion;
    try {
        // Obtener la conexión desde el pool
        conexion = await conexiondb();

        // Asegurarse de que consulta es un objeto con propiedades
        console.log("consulta.roluser", consulta.roluser)
        if (consulta.roluser === "ADMIN") {
            const parametros = [consulta.estatus];
            console.log("parametros", parametros)
            // Ejecutar la consulta usando los parámetros en un array
            const [result] = await conexion.execute(
                `select u.*,  c.nom_cliente from users AS u
                LEFT JOIN  clientes as c
                on  u.id_cliente = c.id
                where U.ESTATUS = ?`,
                 parametros // Pasar los parámetros como un array
            );

            // Retornar el primer resultado (suponiendo que solo hay uno)
            return result || null; // Si no hay coincidencias, se devuelve null
        }
        if (consulta.roluser === "AGENTE") {
            const parametros = [consulta.id_agente, consulta.estatus];
            console.log("parametros", parametros)
            // Ejecutar la consulta usando los parámetros en un array
            const [result] = await conexion.execute(
                `select u.*,  c.nom_cliente from users AS u
                INNER JOIN  clientes as c
                on  u.id_cliente = c.id
                where c.id_agente = ? and U.ESTATUS = ?`,
                parametros // Pasar los parámetros como un array
            );

            // Retornar el primer resultado (suponiendo que solo hay uno)
            return result || null; // Si no hay coincidencias, se devuelve null

        }

    } catch (error) {
        console.error("Error en el login:", error);
        throw error; // Lanzamos el error para que lo maneje el bloque llamante

    } finally {
        // Liberar la conexión si se obtuvo
        if (conexion) {
            conexion.release();
            console.log("Conexión liberada tras UsuariosAgente");
        }
    }
}


/*
function validaUsuario(tabla, data) {
    console.log("data", data)
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT user_name,email, phone_number  FROM ${tabla} where user_name= ? or email = ? or phone_number = ?`, [data.user_name, data.email, data.phone_number], (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    })
}*/

async function validaUsuario(tabla, consulta) {
    let conexion;
    try {
        // Obtener la conexión desde el pool
        conexion = await conexiondb();

        // Asegurarse de que consulta es un objeto con propiedades como 'user_name' y 'user_password'
        console.log("consulta", consulta)

        const parametros = [consulta.user_name, consulta.email, consulta.phone_number];
        console.log("parametros", parametros)
        // Ejecutar la consulta usando los parámetros en un array
        const [result] = await conexion.execute(
            `SELECT user_name,email, phone_number  FROM ${tabla} where user_name= ? or email = ? or phone_number = ?`,
            parametros // Pasar los parámetros como un array
        );

        // Retornar el primer resultado (suponiendo que solo hay uno)
        return result || null; // Si no hay coincidencias, se devuelve null

    } catch (error) {
        console.error("Error en el login:", error);
        throw error; // Lanzamos el error para que lo maneje el bloque llamante

    } finally {
        // Liberar la conexión si se obtuvo
        if (conexion) {
            conexion.release();
            console.log("Conexión liberada tras validaUsuario");
        }
    }
}


/*
function login(tabla, consulta) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT id, user_password, user_name, rol_user, id_cliente  FROM ${tabla}  where ?`, consulta, (error, result) => {
            return error ? reject(error) : resolve(result[0]);
        })
    })
}*/

async function login(tabla, consulta) {
    let conexion;
    try {
        // Obtener la conexión desde el pool
        conexion = await conexiondb();

        // Asegurarse de que consulta es un objeto con propiedades como 'user_name' y 'user_password'
        console.log("consulta", consulta)

        const parametros = [consulta.user_name];
        console.log("parametros", parametros)
        // Ejecutar la consulta usando los parámetros en un array
        const [result] = await conexion.execute(
            `SELECT id, user_password, user_name, rol_user, id_cliente 
            FROM ${tabla} 
            WHERE user_name = ?`,
            parametros // Pasar los parámetros como un array
        );

        // Retornar el primer resultado (suponiendo que solo hay uno)
        return result[0] || null; // Si no hay coincidencias, se devuelve null

    } catch (error) {
        console.error("Error en el login:", error);
        throw error; // Lanzamos el error para que lo maneje el bloque llamante

    } finally {
        // Liberar la conexión si se obtuvo
        if (conexion) {
            conexion.release();
            console.log("Conexión liberada tras login");
        }
    }
}

async function hitMaximo (tabla, consulta) { 
    console.log( "HitMaximo", consulta.id_cliente);  
    let conexion;
    try {
        // Obtener la conexión desde el pool
        conexion = await conexiondb(); 

        console.log("consulta", consulta)

        const parametros = [consulta.id_cliente];
        console.log("parametros", parametros)
        // Ejecutar la consulta usando los parámetros en un array
        const [result] = await conexion.execute(
            `SELECT max(num_hit) as num_hit FROM ${tabla}  where id_cliente = ?`,
            parametros // Pasar los parámetros como un array
        );

          /* 
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT max(num_hit) as num_hit FROM ${tabla}  where `, [consulta], (error, result) => {
            return error ? reject(error) : resolve(result[0]);
        })
    })
    */
        // Retornar el primer resultado (suponiendo que solo hay uno)
        return result[0] || null; // Si no hay coincidencias, se devuelve null

    } catch (error) {
        console.error("Error en el login:", error);
        throw error; // Lanzamos el error para que lo maneje el bloque llamante

    } finally {
        // Liberar la conexión si se obtuvo
        if (conexion) {
            conexion.release();
            console.log("Conexión liberada tras login");
        }
    }; 

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