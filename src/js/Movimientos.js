   // Definir las columnas de la tabla AG-Grid

var gridOptions;
var forms = document.querySelectorAll('.needs-validation')
var idMovimiento = 0, id_cliente = 0;

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
        idMovimiento = params.data.id;
        id_cliente = params.data.id_cliente;
        console.log("idMovimiento", idMovimiento)
        
        $("#nombre_cliente").val(params.data.nom_cliente),
        $("#monto_entrada").val(params.data.monto_entrada),
        $("#fecha_entrada").val(params.data.fecha_entrada),
        $("#valor_bcoin").val(params.data.valor_bcoin),
        $("#precio_inicial").val(params.data.precio_inicial),
        $("#precio_final").val(params.data.precio_final),
        $("#monto_salida").val(params.data.monto_salida),
        $("#fecha_salida").val(params.data.fecha_salida),
        $("#utilidad_perdida").val(params.data.utilidad_perdida)

    }},
    {headerName: "Cliente", field: "nom_cliente", sortable: true},
    {headerName: "Monto entrada", field: "monto_entrada", sortable: true},
    {headerName: "Fecha entrada", field: "fecha_entrada", sortable: true},
    {headerName: "Valor bcoin", field: "valor_bcoin", sortable: true},
    {headerName: "Precio inicial", field: "precio_inicial", sortable: true},
    {headerName: "Precio_final", field: "precio_final", sortable: true}
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
    fetch('http://localhost:4000/api/movimientos') 
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

function AgregarMovimiento(){
    const postData = {
        id: idMovimiento,
        id_cliente: id_cliente,
        monto_entrada: $("#monto_entrada").val(),
        fecha_entrada: $("#fecha_entrada").val(),
        valor_bcoin: $("#valor_bcoin").val(),
        precio_inicial: $("#precio_inicial").val(),
        precio_final: $("#precio_final").val(),
        monto_salida: $("#monto_salida").val(),
        fecha_salida: $("#fecha_salida").val(),
        utilidad_perdida: $("#utilidad_perdida").val(),
        estatus: "A"
    };

    console.log("postData", postData)
    // Realizamos la solicitud POST
    
    fetch('http://localhost:4000/api/movimientos', {
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
    $("#nombre_cliente").val("");
    $("#monto_entrada").val("");
    $("#valor_bcoin").val("");
    $("#precio_inicial").val("");
    $("#precio_final").val("");
    $("#monto_salida").val("");  
    $("#fecha_entrada").val("");
    $("#fecha_salida").val("");
    idMovimiento = 0;
    id_cliente = 0;
}

function dev_formato_moneda_peruana(valor){
    return Number.parseFloat(valor).toFixed(2)
}

const gridDiv = document.querySelector("#tblMovimientos");
gridApi = agGrid.createGrid(gridDiv, gridOptions)

var modal = document.getElementById("myModal-movimientos");
const btnNuevoMovimiento = document.getElementById("btnNuevoMovimiento");
var span = document.getElementById("modalclose");

// Agregar un event listener con parámetros
btnNuevoMovimiento.addEventListener("click", function() {
    modal.style.display = "block";
});

span.onclick = function() {
    modal.style.display = "none";
    LimpiarFormulario();
}

document.getElementById('nombre_cliente').addEventListener('input', function() {
    const query = this.value;
    if (query.length > 0) {
        fetchSuggestions(query);
    } else {
        clearSuggestions();
    }
});

function fetchSuggestions(query) {
    // Asegúrate de reemplazar esta URL con la URL de tu API de autocompletado
    const url = `http://localhost:4000/api/clientes/autocomplete?query=${query}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            showSuggestions(data.body);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function showSuggestions(suggestions) {
    const suggestionContainer = document.getElementById('autocomplete-suggestions');
    suggestionContainer.innerHTML = ''; // Limpiar sugerencias previas

    console.log("suggestions", suggestions)
    suggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.textContent = suggestion.nom_cliente;
        div.addEventListener('click', function() {
            document.getElementById('nombre_cliente').value = suggestion.nom_cliente;
            id_cliente = suggestion.id
            clearSuggestions();
        });
        suggestionContainer.appendChild(div);
    });
}

function clearSuggestions() {
    const suggestionContainer = document.getElementById('autocomplete-suggestions');
    suggestionContainer.innerHTML = ''; // Limpiar todas las sugerencias
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
            AgregarMovimiento();
        form.classList.add('was-validated')
      }, false)
    })
 })