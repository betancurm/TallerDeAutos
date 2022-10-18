using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TallerDeAutos.Modelos;
using libComunes.CapaDatos;

namespace TallerDeAutos.Clases
{
    public class clsCliente
    {
        public Cliente cliente { get; set; }
        
        public string Insertar()
        {
            string SQL = "Cliente_Insertar";//procendimiento almacenado de insertar
            clsConexion oConexion = new clsConexion();
            oConexion.SQL = SQL;
            oConexion.StoredProcedure = true; //Para indicar que es un procedimiento almacenado
            oConexion.AgregarParametro("@prNombre", cliente.Nombre);
            oConexion.AgregarParametro("@prPrimer_Apellido", cliente.PrimerApellido);
            oConexion.AgregarParametro("@prSegundo_Apellido", cliente.SegundoApellido);
            oConexion.AgregarParametro("@prTelefono", cliente.Telefono);
            oConexion.AgregarParametro("@prCorreo", cliente.Correo);
            oConexion.AgregarParametro("@prDocumento", cliente.Documento);
            oConexion.AgregarParametro("@prFK_Tipo_Documento", cliente.TipoDocumento);
            oConexion.AgregarParametro("@prFK_Marca_Vehiculo", cliente.MarcaVehiculo);
            oConexion.AgregarParametro("@prPlaca_Vehiculo", cliente.PlacaVehiculo);


            if (oConexion.EjecutarSentencia())
            {
                return "cliente insertado correctamente";
            }
            else
            {
                cliente.Error = oConexion.Error;
                return cliente.Error;
            }
        }
        public string Actualizar()
        {
            string SQL = "Cliente_Actualizar";//procendimiento almacenado de insertar
            clsConexion oConexion = new clsConexion();
            oConexion.SQL = SQL;
            oConexion.StoredProcedure = true; //Para indicar que es un procedimiento almacenado
            oConexion.AgregarParametro("@prIdCliente", cliente.IdCliente);
            oConexion.AgregarParametro("@prNombre", cliente.Nombre);
            oConexion.AgregarParametro("@prPrimer_Apellido", cliente.PrimerApellido);
            oConexion.AgregarParametro("@prSegundo_Apellido", cliente.SegundoApellido);
            oConexion.AgregarParametro("@prTelefono", cliente.Telefono);
            oConexion.AgregarParametro("@prCorreo", cliente.Correo);
            oConexion.AgregarParametro("@prDocumento", cliente.Documento);
            oConexion.AgregarParametro("@prFK_Tipo_Documento", cliente.TipoDocumento);
            oConexion.AgregarParametro("@prFK_Marca_Vehiculo", cliente.MarcaVehiculo);
            oConexion.AgregarParametro("@prPlaca_Vehiculo", cliente.PlacaVehiculo);

            if (oConexion.EjecutarSentencia())
            {
                return "Producto Actualizado correctamente";
            }
            else
            {
                cliente.Error = oConexion.Error;
                return cliente.Error;
            }
        }
        public bool Consultar()
        {
            string SQL = "Cliente_Consultar";

            clsConexion oConexion = new clsConexion();
            oConexion.SQL = SQL;
            oConexion.StoredProcedure = true;//Para indicar que es un procedimiento almacenado
            oConexion.AgregarParametro("@prIdCliente", cliente.IdCliente);

            if (oConexion.Consultar())
            {
                if (oConexion.Reader.HasRows)
                {
                    //Primero hay que poner a leer el reader
                    oConexion.Reader.Read();
                    //Hay información y se captura
                    cliente.Nombre = oConexion.Reader.GetString(0);
                    cliente.PrimerApellido = oConexion.Reader.GetString(1);
                    cliente.SegundoApellido = oConexion.Reader.GetString(2);
                    cliente.TipoDocumento = oConexion.Reader.GetInt32(3);
                    cliente.Documento = oConexion.Reader.GetString(4);
                    cliente.Telefono = oConexion.Reader.GetString(5);
                    cliente.Correo = oConexion.Reader.GetString(6);
                    cliente.IdCliente = oConexion.Reader.GetInt32(7);
                    cliente.MarcaVehiculo = oConexion.Reader.GetInt32(8);
                    cliente.PlacaVehiculo = oConexion.Reader.GetString(9);

                    return true;
                }
                else
                {
                    //No hay datos, se levanta un error
                    cliente.Error = "No hay datos para el cliente con el Id: " + cliente.IdCliente;
                    return false;
                }
            }
            else
            {
                cliente.Error = oConexion.Error;
                return false;
            }
        }
        public string Eliminar()
        {
            string SQL = "Cliente_Eliminar";//procendimiento almacenado de insertar
            clsConexion oConexion = new clsConexion();
            oConexion.SQL = SQL;
            oConexion.StoredProcedure = true; //Para indicar que es un procedimiento almacenado
            oConexion.AgregarParametro("@prIdCliente", cliente.IdCliente);

            if (oConexion.EjecutarSentencia())
            {
                return "Producto Eliminado correctamente";
            }
            else
            {
                cliente.Error = oConexion.Error;
                return cliente.Error;
            }
        }


    }
}