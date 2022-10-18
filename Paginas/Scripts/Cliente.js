//Codigo para garantizar que se ejecute el código cuando termine de cargar la pagina
$(document).ready(function () {
    //Defino la funcionalidad del botón registrar
    $("#btnInsertar").click(function () {
        ProcesarComandos("Insertar");
    });
    //Defino la funcionalidad del botón actualizar
    $("#btnActualizar").click(function () {
        ProcesarComandos("Actualizar");
    });
    //Defino la funcionalidad del botón Consultar
    $("#btnConsultar").click(function () {
        ProcesarComandos("Consultar");
    });
    //Defino la funcionalidad del botón Eliminar
    $("#btnEliminar").click(function () {
        ProcesarComandos("Eliminar");
    });
    LlenarComboTipoDocumentoCliente();
    LlenarComboMarcaVehiculo();
    LlenarTablaCliente();

});
function LlenarComboTipoDocumentoCliente() {
    LlenarComboControlador("../Comunes/ControladorCombos.ashx", "TipoDocumento", null, "#cboTipoDocumentoCliente")
}
function LlenarComboMarcaVehiculo() {
    LlenarComboControlador("../Comunes/ControladorCombos.ashx", "MarcaVehiculo", null, "#cboMarcaVehiculo")
}
function LlenarTablaCliente() {
    LlenarGridControlador("../Comunes/ControladorGrids.ashx", "Clientes", null, "#tblClientes")
}

function ProcesarComandos(Comando) {
    var IdCliente = $("#txtIdCliente").val();
    var Nombre = $("#txtNombreCliente").val();
    var PrimerApellido = $("#txtPrimerApellidoCliente").val();
    var SegundoApellido = $("#txtSegundoApellidoCliente").val();
    var Telefono = $("#txtTelefonoCliente").val();
    var Correo = $("#txtCorreoCliente").val();
    var TipoDocumento = $("#cboTipoDocumentoCliente").val();
    var Documento = $("#txtDocumentoCliente").val();
    var MarcaVehiculo = $("#cboMarcaVehiculo").val();
    var PlacaVehiculo = $("#txtPlacaVehiculo").val();

    var DatosCliente = {
        IdCliente: IdCliente,
        Nombre: Nombre,
        PrimerApellido: PrimerApellido,
        SegundoApellido: SegundoApellido,
        Telefono: Telefono,
        Correo: Correo,
        TipoDocumento: TipoDocumento,
        Documento: Documento,
        MarcaVehiculo: MarcaVehiculo,
        PlacaVehiculo: PlacaVehiculo,
        Comando: Comando
    }
    $.ajax({
        //Función Ajax
        type: "POST",
        url: "../Controladores/ControladorCliente.ashx",
        contentType: "json",
        data: JSON.stringify(DatosCliente),
        success: function (RptaCliente) {
            if (Comando != "Consultar") {
                //Hay que procesar la respuesta para identificar si hay un error
                $("#dvMensaje").addClass("alert alert-success");
                $("#dvMensaje").html(RptaCliente);
                LlenarTablaCliente();
            }
            else {
                let infoCliente = JSON.parse(RptaCliente);
                $("#txtIdCliente").val(infoCliente.IdCliente);
                $("#txtNombreCliente").val(infoCliente.Nombre);
                $("#txtPrimerApellidoCliente").val(infoCliente.PrimerApellido);
                $("#txtSegundoApellidoCliente").val(infoCliente.SegundoApellido);
                $("#txtTelefonoCliente").val(infoCliente.Telefono);
                $("#txtCorreoCliente").val(infoCliente.Correo);
                $("#cboTipoDocumentoCliente").val(infoCliente.TipoDocumento);
                $("#txtDocumentoCliente").val(infoCliente.Documento);
                $("#cboMarcaVehiculo").val(infoCliente.MarcaVehiculo);
                $("#txtPlacaVehiculo").val(infoCliente.PlacaVehiculo);
            }
        },
        error: function (RespuestaError) {
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html(RespuestaError);
        }
    });

}