//Código para garantizar que se ejecute el código cuando termine de cargar la página
$(document).ready(function () {
    //Defino la funcionalidad del botón "Actualizar"
    $("#btnActualizar").click(function () {
        ProcesarComandos("Actualizar");
    });
    //Defino la funcionalidad de la página
    //Funcionalidad del botón "Registrar"
    $("#btnInsertar").click(function () {
        ProcesarComandos("Insertar");
    });
    $("#btnEliminar").click(function () {
        ProcesarComandos("Eliminar");
    });
    $("#btnConsultar").click(function () {
        ProcesarComandos("Consultar");
    });
    //Llenar el combo de paises
    LlenarComboCliente();
    LlenarGridRecepciones();
});
function LlenarGridRecepciones() {
    LlenarGridControlador("../Comunes/ControladorGrids.ashx", "TablaRecepciones", null, "#tblRecepciones");
}
function ProcesarComandos(Comando) {
    var IdRecepcion = $("#txtIdRecepcion").val();
    if (Comando == "Insertar") { IdRecepcion = 0; }
    var IdCliente = $("#cboCliente").val();
    var CambioAceite = $("#chkAceiteActivo").prop('checked');
    var FechaIngreso = $("#txtFechaIngreso").val();
    var FechaSalida = $("#txtFechaSalida").val();
    var DescripcionRecepcion = $("#txtDescripcionRecepcion").val();

    var DatosRecepcionVehiculo = {
        IdRecepcion: IdRecepcion,
        IdCliente: IdCliente,
        CambioAceite: CambioAceite,
        FechaIngreso: FechaIngreso,
        FechaSalida: FechaSalida,
        DescripcionRecepcion: DescripcionRecepcion,
        Comando: Comando
    }
    $.ajax({
        //Función Ajax
        type: "POST",
        url: "../Controladores/ControladorRecepcionVehiculo.ashx",
        contentType: "json",
        data: JSON.stringify(DatosRecepcionVehiculo),
        success: function (RptaRecepcionVehiculo) {
            if (Comando != "Consultar") {
                //Hay que procesar la respuesta para identificar si hay un error
                $("#dvMensaje").addClass("alert alert-success");
                $("#dvMensaje").html(RptaRecepcionVehiculo);
                LlenarGridRecepciones();
            }
            else {
                let InfoRptaRecepcionVehiculo = JSON.parse(RptaRecepcionVehiculo);
                $("#txtIdRecepcion").val(InfoRptaRecepcionVehiculo.IdRecepcion);
                //$("#cboVehiculo").val(InfoRptaRecepcionVehiculo.CodigoVehiculo);
                //$("#txtFechaIngreso").val(InfoRptaRecepcionVehiculo.FechaIngreso);
                //$("#txtFechaSalida").val(InfoRptaRecepcionVehiculo.FechaSalida);
                $("#txtDescripcionRecepcion").val(InfoRptaRecepcionVehiculo.DescripcionRecepcion);
                //let Cliente = InfoRptaRecepcionVehiculo.IdCliente;
                //LlenarComboCliente(Cliente);
                $("#chkAceiteActivo").prop('checked', InfoRptaRecepcionVehiculo.CambioAceite);
            }
        },
        error: function (RespuestaError) {
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html(RespuestaError);
        }
    });
}
function LlenarComboCliente() {
    var promise = LlenarComboControlador("../Comunes/ControladorCombos.ashx", "CLIENTE", null, "#cboCliente");

    if (promise) {
        promise.then(function (value) {
            //Se invoca el llenado del combo de producto
            LlenarComboVehiculo(0);
        });
    }
}
function LlenarComboVehiculo(CodVehiculo) {
    //Limpiar el combo de departamento
    $("#cboVehiculo").empty();
    let Cliente = $("#cboCliente").val();
    var lstParametros = [{ "Parametro": "@prIdcliente", "Valor": Cliente }];
    var promise = LlenarComboControlador("../Comunes/ControladorCombos.ashx", "VEHICULO", lstParametros, "#cboVehiculo");
    if (promise) {
        promise.then(function (value) {
            if (CodVehiculo > 0) {
                $("#cboVehiculo").val(CodVehiculo);
            }
        });
    }
}