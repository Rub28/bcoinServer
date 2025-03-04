const fetch1 = require('node-fetch');

// URL de la API
const url = 'http://localhost:4000/api/auth/login';

// Datos a enviar
const data = {
            user_name: "Richar",
            user_password: "123richar"
      };  

function validausuario() {  
// Enviar solicitud POST
fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((json) => console.log('Respuesta:', json))
  .catch((error) => console.error('Error:', error));

} ; 

validausuario();  