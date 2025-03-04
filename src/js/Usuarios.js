   // Definir las columnas de la tabla AG-Grid

var gridOptions;
var forms = document.querySelectorAll('.needs-validation')
var idUsuario = 0;

function modelUpdated() {
    var model = gridOptions.api.getModel();
    var totalRows = model.getTopLevelNodes().length;
    var processedRows = model.getRowCount();
    var eSpan = document.querySelector('#rowCount');
    eSpan.innerHTML = processedRows.toLocaleString("es-MX") + ' / ' + totalRows.toLocaleString("es-MX");
}

var columnDefs = [
    {headerName:"", width: 40, onCellClicked: function (params) {
        LimpiarFormulario();
        modal.style.display = "block";
        console.log(params.data.id)
        idUsuario = params.data.id;
        console.log("idUsuario", idUsuario)
        $("#password").val(params.data.user_password);
        $("#nombre_usuario").val(params.data.user_name);        
        $("#fist_name").val(params.data.firt_name);
        $("#second_name").val(params.data.second_name);
        $("#phone_number").val(params.data.phone_number);
        $("#email").val(params.data.email); 
        $("#TipoUsuario").val(params.data.rol_user);

    }},
    {headerName: "Usuario", field: "user_name", sortable: true},
    {headerName: "Nombre", field: "firt_name", sortable: true},
    {headerName: "Apellidos", field: "second_name", sortable: true},
    {headerName: "Telefono", field: "phone_number", sortable: true},
    {headerName: "Correo", field: "email", sortable: true},
    {headerName: "Estatus", field: "estatus", sortable: true},
    {headerName: "Rol", field: "rol_user", sortable: true},
];

// Configuración de la grilla
gridOptions = {
    columnDefs: columnDefs,
    rowData: null,  // Los datos se cargarán dinámicamente
    onGridReady: function (params) {
        gridOptions.api = params.api;
        gridOptions.columnApi = params.columnApi;
        console.log("Grid Ready - API Disponible")
        loadDataFromApi(); // Cargar l,os datos desde la API cuando el grid esté listo
    },
    onModelUpdated: modelUpdated,
};


function loadDataFromApi() {
    fetch('http://localhost:4000/api/usuarios') 
        .then(response => response.json())
        .then(data => {
            console.log('Datos obtenidos desde la API:', data.body);
            if (gridApi) {
                gridApi.setGridOption("rowData", data.body); // Establecemos los datos obtenidos
            }
        })
        .catch(error => {
            console.log('Error al obtener los datos de la API:', error);
        });
}

function AgregarUsuario(){
    const postData = {
        id: idUsuario,
        user_name: $("#nombre_usuario").val(),
        user_password: $("#password").val(),
        firt_name: $("#fist_name").val(),
        second_name: $("#second_name").val(),
        phone_number: $("#phone_number").val(),
        email: $("#email").val(),
        estatus: "A",
        rol_user: $("#TipoUsuario").val(),
    };

    console.log("postData", postData)
    // Realizamos la solicitud POST
    
    fetch('http://localhost:4000/api/Usuarios', {
        method: 'POST', // Método HTTP
        headers: {
            'Content-Type': 'application/json', // Tipo de contenido
        },
        body: JSON.stringify(postData) // Convertimos los datos en formato JSON
    })
    .then(response => response.json())  // Convertimos la respuesta en JSON
    .then(data => {
        console.log('Respuesta de la API:', data);
        alert("Datos enviados con éxito");
        loadDataFromApi();
        modal.style.display = "none";
    })
    .catch(error => {
        console.error('Error al enviar los datos:', error);
        alert("Hubo un error al enviar los datos.");
    });
}

function LimpiarFormulario(){
    $("#nombre_usuario").val("");
    $("#password").val("");
    $("#fist_name").val("");
    $("#second_name").val("");
    $("#phone_number").val("");
    $("#email").val("");  
    $("#TipoUsuario").val("");
    idUsuario == 0;
}
const gridDiv = document.querySelector("#tblUsuarios");
gridApi = agGrid.createGrid(gridDiv, gridOptions)

var modal = document.getElementById("myModal-usuario");
const btnNuevoUser = document.getElementById("btnNuevoUser");
var span = document.getElementById("modalclose");
const myFormNuevoUsuario = document.getElementById('myFormNuevoUsuario');

// Agregar un event listener con parámetros
btnNuevoUser.addEventListener("click", function() {
    modal.style.display = "block";
});

span.onclick = function() {
    modal.style.display = "none";
    LimpiarFormulario();
}


 $(function(){
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
        console.log("valido", form.checkValidity())
          event.preventDefault()
          event.stopPropagation();
          
        }
        if(form.checkValidity())
            AgregarUsuario();
        form.classList.add('was-validated')
      }, false)
    })
 })