   // Definir las columnas de la tabla AG-Grid

var gridOptions;
var forms = document.querySelectorAll('.needs-validation')
var idCliente = 0;

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
        idCliente = params.data.id;
        console.log("idUsuario", idCliente)
        $("#user_name").val(params.data.user_name);
        $("#nom_cliente").val(params.data.nom_cliente);        
        $("#rfc").val(params.data.rfc);
        $("#direccion").val(params.data.direccion);
        $("#email").val(params.data.email_cliente);       

    }},
    {headerName: "Nombre cliente", field: "nom_cliente", sortable: true},
    {headerName: "RFC", field: "rfc", sortable: true},
    {headerName: "Direccion", field: "direccion", sortable: true},
    {headerName: "Email cliente", field: "email_cliente", sortable: true},
    {headerName: "Estatus", field: "estatus", sortable: true}
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
    fetch('http://localhost:4000/api/clientes') 
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

function AgregarCliente(){
    const postData = {
        id: idCliente,
        user_name : $("#user_name").val(),
        nom_cliente : $("#nom_cliente").val(),
        rfc : $("#rfc").val(),
        direccion : $("#direccion").val(),
        estatus: 'A',
        email_cliente : $("#email").val()
    };

    console.log("postData", postData)
    // Realizamos la solicitud POST
    
    fetch('http://localhost:4000/api/Clientes', {
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
        //loadDataFromApi();
        //modal.style.display = "none";
    })
    .catch(error => {
        console.error('Error al enviar los datos:', error);
        alert("Hubo un error al enviar los datos.");
    });
}

function LimpiarFormulario(){
    $("#user_name").val("");
    $("#nom_cliente").val("");
    $("#rfc").val("");
    $("#direccion").val("");
    $("#phone_number").val("");
    $("#email").val("");
    idCliente == 0;
}
const gridDiv = document.querySelector("#tblClientes");
gridApi = agGrid.createGrid(gridDiv, gridOptions)

var modal = document.getElementById("myModal-clientes");
const btnNuevoCliente = document.getElementById("btnNuevoCliente");
var span = document.getElementById("modalclose");
const btnGuardarUsuarios = document.getElementById("btnGuardarUsuarios");
const myFormNuevoUsuario = document.getElementById('myFormNuevoUsuario');

// Agregar un event listener con parámetros
btnNuevoCliente.addEventListener("click", function() {
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
            AgregarCliente();
        form.classList.add('was-validated')
      }, false)
    })
 })