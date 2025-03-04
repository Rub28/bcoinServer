// script.js

// Obtener el modal
var modal = document.getElementById("myModal-usuario");
var modal1 = document.getElementById("myModal-clientes");
var modal2 = document.getElementById("myModal-operativa");
var modal3 = document.getElementById("myModal-movimientos");

// Obtener el botón que abre el modal
var btn = document.getElementById("openModal-usuario");
var btn1 = document.getElementById("openModal-clientes");
var btn2 = document.getElementById("openModal-operativa");
var btn3 = document.getElementById("openModal-movimientos");

// Obtener el elemento que cierra el modal
var span = document.getElementById("closeModal-usuario");
var span1 = document.getElementById("closeModal-clientes");
var span2 = document.getElementById("closeModal-operativa"); 
var span3 = document.getElementById("closeModal-movimientos");

// Obtener el formulario
const registerForm = document.getElementById("register-user");


// Cuando el usuario hace clic en el botón, abre el modal
/*btn.onclick = function() {
    modal.style.display = "block";
}*/
btn1.onclick = function() {
    modal1.style.display = "block";
}

btn2.onclick = function() {
    modal2.style.display = "block";
}
btn3.onclick = function() {
    modal3.style.display = "block";
}



// Cuando el usuario hace clic en la 'x', cierra el modal
/*
span.onclick = function() {
    modal.style.display = "none";
}*/

// Cuando el usuario hace clic en la 'x', cierra el modal
span1.onclick = function() {
    modal1.style.display = "none";
}

// Cuando el usuario hace clic en la 'x', cierra el modal
span2.onclick = function() {
    modal2.style.display = "none";
}
// Cuando el usuario hace clic en la 'x', cierra el modal
span3.onclick = function() {
    modal3.style.display = "none";
}



// Manejar el envío del formulario
registerForm.onsubmit = function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe

    // Obtener los valores del formulario
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validar los datos (puedes agregar más validaciones)
    if (name && email && password) {
        // Mostrar los datos en la consola (puedes enviarlos a un servidor)
        console.log("Nombre:", name);
        console.log("Correo Electrónico:", email);
        console.log("Contraseña:", password);

        // Cerrar el modal después de registrar
        modal.style.display = "none";

        // Limpiar el formulario
        registerForm.reset();

        // Mostrar un mensaje de éxito (opcional)
        alert("Usuario registrado con éxito");
    } else {
        alert("Por favor, complete todos los campos.");
    }
};

// Selecciona todos los inputs con la clase "amount"
const amountInputs = document.querySelectorAll('.amount');

// Función para formatear el importe
function formatAmount(value) {
    // Elimina cualquier carácter que no sea número o punto decimal
    value = value.replace(/[^0-9.]/g, '');

    // Separa la parte entera y la parte decimal
    let parts = value.split('.');
    let integerPart = parts[0];
    let decimalPart = parts.length > 1 ? '.' + parts[1].slice(0,2) : '';

    // Formatea la parte entera con separadores de miles
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Combina la parte entera y la parte decimal
    return integerPart + decimalPart;
}

// Aplica la validación y formato a cada input
amountInputs.forEach(input => {
    input.addEventListener('input', function (e) {
        e.target.value = formatAmount(e.target.value);
    });
});

// Cuando el usuario hace clic fuera del modal, cierra el modal
// puede que no sea neceario, se comenta temporal mente 
/* 
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
*/ 
