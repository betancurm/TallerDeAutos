//Código para garantizar que se ejecute el código cuando termine de cargar la página
$(document).ready(function () {
    $("#btnAgregar").click(function () {
        
    });
    $("#btnGrabarFactura").click(function () {
        
    });
    $("#btnLimpiar").click(function () {
        
    });
    $("#btnActualizar").click(function () {
        
    });
    $("#btnEliminar").click(function () {
        
    });
    $("#btnCancelar").click(function () {
        
    });
    $("#btnBuscar").click(function () {
        ConsultarCliente();
    });
    LlenarComboTipoProducto();
    LlenarComboEmpleado();
});
function LlenarComboTipoProducto() {
    //Llama el servicio
    $.ajax({
        //Función Ajax
        type: "GET",
        url: "http://localhost:51428/Api/TipoProducto",
        contentType: "json",
        data: null,
        success: function (DatosTipoProducto) {
            LlenarComboDatos(DatosTipoProducto, "#cboTipoProducto");
            LlenarComboProducto();
        },
        error: function (RespuestaError) {
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html(RespuestaError);
        }
    });
}
function LlenarComboEmpleado(){
    $.ajax({
        //Función Ajax
        type: "GET",
        url: "http://localhost:51428/Api/Empleado",
        contentType: "json",
        data: null,
        success: function (DatosEmpleado) {
            LlenarComboDatos(DatosEmpleado, "#cboEmpleado");
        },
        error: function (RespuestaError) {
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html(RespuestaError);
        }
    });
}
function LlenarComboProducto() {
    let TipoProducto = $("#cboTipoProducto").val();
    $("#cboProducto").empty();
    $.ajax({
        //Función Ajax
        type: "GET",
        url: "http://localhost:51428/Api/Producto?IdTipoProducto=" + TipoProducto,
        contentType: "json",
        data: null,
        success: function (DatosProducto) {
            LlenarComboDatos(DatosProducto, "#cboProducto");
            CalcularSubtotal();
        },
        error: function (RespuestaError) {
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html(RespuestaError);
        }
    });
}
function CalcularSubtotal() {
    let Valor = $("#cboProducto").val();
    let CodigoProducto = Valor.split('|')[0];
    let ValorUnitario = Valor.split('|')[1];
    let Cantidad = $("#txtCantidad").val();
    //Separa los valores
    $("#txtValorUnitarioPresentacion").val('$ ' + new Intl.NumberFormat('es-CO').format(ValorUnitario));
    $("#txtCodigoProducto").val(CodigoProducto);
    $("#txtValorUnitario").val(ValorUnitario);
    //Calcula el subtotal y lo presenta en el textbox
    let Subtotal = Cantidad * ValorUnitario;
    $("#txtSubtotal").val('$ ' + new Intl.NumberFormat('es-CO').format(Subtotal));
}
function ConsultarCliente() {
    let Documento = $("#txtDocumentoCliente").val();
    
    $.ajax({
        //Función Ajax
        type: "GET",
        url: "http://localhost:51428/Api/Clientes?Documento=" + Documento,
        contentType: "json",
        data: null,
        success: function (cliente) {
            $("#txtNombreCliente").val(cliente.Nombre + " " + cliente.PrimerApellido + " " + cliente.SegundoApellido);
        },
        error: function (RespuestaError) {
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html(RespuestaError);
        }
    });
}