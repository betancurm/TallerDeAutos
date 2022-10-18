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
//function ProcesarComandos(Comando) {
//    var Departamento = $("#cboDepartamento").val();
//    var Codigo = $("#txtCodigo").val();
//    if (Comando == "Insertar") { Codigo = 0; }
//    var Nombre = $("#txtCiudad").val();
//    var Activo = $("#chkActivo").prop('checked');

//    var DatosCiudad = {
//        Codigo: Codigo,
//        Nombre: Nombre,
//        Activo: Activo,
//        CodigoDepartamento: Departamento,
//        Comando: Comando
//    }
//    $.ajax({
//        //Función Ajax
//        type: "POST",
//        url: "../Controladores/ControladorCiudad.ashx",
//        contentType: "json",
//        data: JSON.stringify(DatosCiudad),
//        success: function (RptaCiudad) {
//            if (Comando != "Consultar") {
//                //Hay que procesar la respuesta para identificar si hay un error
//                $("#dvMensaje").addClass("alert alert-success");
//                $("#dvMensaje").html(RptaCiudad);
//                LlenarGridCiudades();
//            }
//            else {
//                let InfoCiudad = JSON.parse(RptaCiudad);
//                $("#txtCodigo").val(InfoCiudad.Codigo);
//                $("#txtCiudad").val(InfoCiudad.Nombre);
//                $("#cboPais").val(InfoCiudad.CodigoPais);
//                let Departamento = InfoCiudad.CodigoDepartamento;
//                //Llenar el combo de departamento
//                LlenarComboDepartamento(Departamento);
//                $("#chkActivo").prop('checked', InfoCiudad.Activo);
//            }
//        },
//        error: function (RespuestaError) {
//            $("#dvMensaje").addClass("alert alert-danger");
//            $("#dvMensaje").html(RespuestaError);
//        }
//    });
//}
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