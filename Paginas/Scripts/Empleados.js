$(document).ready(function () {
    //Defino la funcionalidad del botón registrar
    $("#btnInsertar").click(function () {
        InsertarEmpleado();
    });
    //Defino la funcionalidad del botón actualizar
    $("#btnActualizar").click(function () {
        ActualizarEmpleado();
    });
    //Defino la funcionalidad del botón Consultar
    $("#btnConsultar").click(function () {
        ConsultarEmpleado();
    });
    //Defino la funcionalidad del botón Eliminar
    $("#btnEliminar").click(function () {
        EliminarEmpleado();

    });
    LlenarComboTipoDocumento();
});


function InsertarEmpleado() {
    var Documento_Empleado =            $("#txtDocumentoEmpleado").val();
    var FK_Tipo_Documento_Empleado =    $("#cboTipoDocumentoEmpleado").val();
    var Nombre =                        $("#txtNombreEmpleado").val();
    var Primer_Apellido =               $("#txtPrimerApellidoEmpleado").val();
    var Segundo_Apellido =              $("#txtSegundoApellidoEmpleado").val();
    var Direccion =                     $("#txtDireccionEmpleado").val();
    var Telefono =                      $("#txtTelefonoEmpleado").val();


    var DatosEmpleado = {
        Documento_Empleado: Documento_Empleado,
        FK_Tipo_Documento_Empleado: FK_Tipo_Documento_Empleado,
        Nombre: Nombre,
        Primer_Apellido: Primer_Apellido,
        Segundo_Apellido: Segundo_Apellido,
        Direccion: Direccion,
        Telefono: Telefono
    }
    $.ajax({
        //Función Ajax
        type: "POST",
        url: "https://localhost:44315/Api/Empleados",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(DatosEmpleado),
        DataType: "json",
        success: function () {
            $("#txtDocumentoEmpleado").val(null);
            $("#cboTipoDocumentoEmpleado").val(null);
            $("#txtNombreEmpleado").val(null);
            $("#txtPrimerApellidoEmpleado").val(null);
            $("#txtSegundoApellidoEmpleado").val(null);
            $("#txtDireccionEmpleado").val(null);
            $("#txtTelefonoEmpleado").val(null);

            alert("se agrego correctamente");
            
        },
        error: function() {
            alert("no se guardo");
        }

    });
}
function ActualizarEmpleado() {
    var Id_Empleado = $("#txtIdEmpleado").val();
    var Documento_Empleado = $("#txtDocumentoEmpleado").val();
    var FK_Tipo_Documento_Empleado = $("#cboTipoDocumentoEmpleado").val();
    var Nombre = $("#txtNombreEmpleado").val();
    var Primer_Apellido = $("#txtPrimerApellidoEmpleado").val();
    var Segundo_Apellido = $("#txtSegundoApellidoEmpleado").val();
    var Direccion = $("#txtDireccionEmpleado").val();
    var Telefono = $("#txtTelefonoEmpleado").val();


    var DatosEmpleado = {
        Id_Empleado: Id_Empleado,
        Documento_Empleado: Documento_Empleado,
        FK_Tipo_Documento_Empleado: FK_Tipo_Documento_Empleado,
        Nombre: Nombre,
        Primer_Apellido: Primer_Apellido,
        Segundo_Apellido: Segundo_Apellido,
        Direccion: Direccion,
        Telefono: Telefono
    }
    $.ajax({
        //Función Ajax
        type: "PUT",
        url: "https://localhost:44315/Api/empleados?id=" + Id_Empleado,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(DatosEmpleado),
        DataType: "json",
        success: function () {
            $("#txtIdEmpleado").val(null);
            $("#txtDocumentoEmpleado").val(null);
            $("#cboTipoDocumentoEmpleado").val(null);
            $("#txtNombreEmpleado").val(null);
            $("#txtPrimerApellidoEmpleado").val(null);
            $("#txtSegundoApellidoEmpleado").val(null);
            $("#txtDireccionEmpleado").val(null);
            $("#txtTelefonoEmpleado").val(null);

            alert("Empleado actualizado correctamente");

        },
        error: function () {
            alert("no se actualizo");
        }
    });
}
function LlenarComboTipoDocumento() {
    //Llama el servicio
    $.ajax({
        //Función Ajax
        type: "GET",
        url: "https://localhost:44315/Api/tipodocumento",
        contentType: "json",
        data: null,
        success: function (DatosTipoDocumento) {
            LlenarComboControlador("../Comunes/ControladorCombos.ashx", "TipoDocumento", null, "#cboTipoDocumentoEmpleado")
        },
        error: function (RespuestaError) {
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html(RespuestaError);
        }
    });
}
function ConsultarEmpleado() {
    let Documento_Empleado = $("#txtDocumentoEmpleado").val();
    $.ajax({
        //Función Ajax
        type: "GET",
        url: "https://localhost:44315/Api/Empleados?Documento=" + Documento_Empleado,
        contentType: "json",
        data: null,
        success: function (empleado) {
            $("#txtNombreEmpleado").val(empleado.Nombre);
            $("#txtPrimerApellidoEmpleado").val(empleado.Primer_Apellido);
            $("#txtSegundoApellidoEmpleado").val(empleado.Segundo_Apellido);
            $("#txtTelefonoEmpleado").val(empleado.Telefono);
            $("#txtDireccionEmpleado").val(empleado.Direccion);
            $("#txtIdEmpleado").val(empleado.Id_Empleado);
            $("#cboTipoDocumentoEmpleado").val(empleado.FK_Tipo_Documento_Empleado);

        },
        error: function (RespuestaError) {
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html(RespuestaError);
        }
    });
}
function EliminarEmpleado() {
    var Id_Empleado = $("#txtIdEmpleado").val();
    var DatosEmpleado = {
        Id_Empleado: Id_Empleado,
    }
    $.ajax({
        type: "DELETE",
        url: "https://localhost:44315/Api/empleados?id=" + Id_Empleado,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(DatosEmpleado),
        DataType: "json",
        success: function () {

            $("#txtDocumentoEmpleado").val(null);
            $("#cboTipoDocumentoEmpleado").val(null);
            $("#txtNombreEmpleado").val(null);
            $("#txtPrimerApellidoEmpleado").val(null);
            $("#txtSegundoApellidoEmpleado").val(null);
            $("#txtDireccionEmpleado").val(null);
            $("#txtTelefonoEmpleado").val(null);
            $("txtIdEmpleado").val(null);

            alert("el empleado se elimino correctamente");

        },
        error: function () {
            alert("El Empleado no existe");
        }
    });
}