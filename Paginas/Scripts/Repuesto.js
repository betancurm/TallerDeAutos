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
    //Llenar el combo de tipo producto
    LlenarComboMarcaRepuesto();
    LlenarTablaRepuestos();
});
function LlenarComboMarcaRepuesto() {
    //Se invoca la función del javascript compartido "Combos.js" que está en la carpeta comunes
    //la cual invoca la ruta url con el comando para generar un json de respuesta con objetos de tipo 
    //Valor - Texto, que son llenados en un objeto tipo select
    LlenarComboControlador("../Comunes/ControladorCombos.ashx", "MarcaRepuesto", null, "#cboMarcaRepuesto");
    /*
     * var URL = "../Comunes/ControladorCombos.ashx";
    var Comando = "TipoProducto";
    var selectHTML = "#cboTipoProducto"
    LlenarComboControlador(URL, Comando, null, selectHTML);
    */
}
function LlenarTablaRepuestos() {
    //Invoca el table del javascript compartido "Grids.js"
    LlenarGridControlador("../Comunes/ControladorGrids.ashx", "TablaRepuestos", null, "#tblRepuesto");
}

function ProcesarComandos(Comando) {
    var IdRepuesto = $("#txtIdRepuesto").val();
    var Referencia = $("#txtRefRepuesto").val();
    var Nombre = $("#txtNombreRepuesto").val();
    var ValorUnitario = $("#txtValorUnitario").val();
    var Descripcion = $("#txtDescripcion").val();
    var MarcaRepuesto = $("#cboMarcaRepuesto").val();

    var DatosRepuesto = {
        IdRepuesto: IdRepuesto,
        Referencia: Referencia,
        Nombre: Nombre,
        ValorUnitario: ValorUnitario,
        Descripcion: Descripcion,
        MarcaRepuesto: MarcaRepuesto,
        Comando: Comando
    }
    $.ajax({
        //Función Ajax
        type: "POST",
        url: "../Controladores/ControladorRepuesto.ashx",
        contentType: "json",
        data: JSON.stringify(DatosRepuesto),
        success: function (RptaRepuestos) {
            if (Comando != "Consultar") {
                //Hay que procesar la respuesta para identificar si hay un error
                $("#dvMensaje").addClass("alert alert-success");
                $("#dvMensaje").html(RptaRepuestos);
                LlenarTablaRepuestos();
            }
            else {
                let infoRepuesto = JSON.parse(RptaRepuestos);
                $("#txtIdRepuesto").val(infoRepuesto.IdRepuesto);
                $("#txtRefRepuesto").val(infoRepuesto.Referencia);
                $("#txtNombreRepuesto").val(infoRepuesto.Nombre);
                $("#txtDescripcion").val(infoRepuesto.Descripcion);
                $("#txtValorUnitario").val(infoRepuesto.ValorUnitario);
                $("#cboMarcaRepuesto").val(infoRepuesto.MarcaRepuesto);
            }
        },
        error: function (RespuestaError) {
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html(RespuestaError);
        }
    });
}