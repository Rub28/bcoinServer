


const boton = document.getElementById('btn-login');

// Agregar un evento para que muestre un mensaje cuando se haga clic
boton.addEventListener('click', function() {    
      /*
      var settings = {
            "url": "http://localhost:4000/api/auth/login",
            "method": "POST",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/json"
            },
            "data": JSON.stringify({
              "user_name": "Ricado18",
              "user_password": "123456"
            }),
          };
          
          $.ajax(settings).done(function (response) {
            console.log(response);
          });
          */
          validaUser();
});

async function validaUser() {  
      // URL de la API
      const url = 'http://localhost:4000/api/auth/login';
  
      // Datos a enviar 
                const bodyJson = {
                  user_name: "Ricado18",
                  user_password: "123456"
                };
  
      //console.log(bodyJson); 
  
      const response = await fetch(url, {
              method: 'post', 
              body: JSON.stringify(bodyJson),
              headers: {'Content-Type': 'application/json'}
      });
      const data = await response.json();
  
      console.log(data);
      const decoded = jwt_decode(data.body);
      console.log(decoded);
      return (data); 
  
   } ;  
/*
   document.addEventListener('keydown', function (e) {
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();  // Bloquea las teclas
        
      }
    });

    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      
    });

    Object.defineProperty(window, 'console', {
      value: { log: function () {} }
    });
    */

    var $j = jQuery.noConflict();
$j(document).ready(function() {
    // Aquí puedes usar $j en lugar de $
    console.log('jQuery está cargado');
});