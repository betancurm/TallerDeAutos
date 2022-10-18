using libComunes.CapaDatos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TallerDeAutos.Modelos;

namespace TallerDeAutos.Clases
{
    public class clsRecepcionVehiculo
    {
        public RecepcionVehiculo recepcion { get; set; }
        public string Insertar()
        {
            string SQL = "RecepcionVehiculo_Insetar";//procendimiento almacenado de insertar
            clsConexion oConexion = new clsConexion();
            oConexion.SQL = SQL;
            oConexion.StoredProcedure = true; //Para indicar que es un procedimiento almacenado
            oConexion.AgregarParametro("@prFK_Id_cliente", recepcion.IdCliente);
            oConexion.AgregarParametro("@prFechaIngreso", recepcion.FechaIngreso);
            //oConexion.AgregarParametro("@prFechaSalida", recepcion.FechaSalida);
            oConexion.AgregarParametro("@prCambioAceite", recepcion.CambioAceite);
            oConexion.AgregarParametro("@prDescripcion", recepcion.DescripcionRecepcion);




            if (oConexion.EjecutarSentencia())
            {
                return "recepcion insertada correctamente";
            }
            else
            {
                recepcion.Error = oConexion.Error;
                return recepcion.Error;
            }
        }
        public string Actualizar()
        {
            string SQL = "RecepcionVehiculo_Actualizar";//procendimiento almacenado de insertar
            clsConexion oConexion = new clsConexion();
            oConexion.SQL = SQL;
            oConexion.StoredProcedure = true; //Para indicar que es un procedimiento almacenado
            oConexion.AgregarParametro("@idRecepcion_Vehiculo", recepcion.IdRecepcion);
            oConexion.AgregarParametro("@prFK_Id_cliente", recepcion.IdCliente);
            oConexion.AgregarParametro("@prFechaIngreso", recepcion.FechaIngreso);
            oConexion.AgregarParametro("@prFechaSalida", recepcion.FechaSalida);
            oConexion.AgregarParametro("@prCambioAceite", recepcion.CambioAceite);
            oConexion.AgregarParametro("@prDescripcion", recepcion.DescripcionRecepcion);

            if (oConexion.EjecutarSentencia())
            {
                return "Producto Actualizado correctamente";
            }
            else
            {
                recepcion.Error = oConexion.Error;
                return recepcion.Error;
            }
        }
        public bool Consultar()
        {
            string SQL = "RecepcionVehiculo_Consultar";

            clsConexion oConexion = new clsConexion();
            oConexion.SQL = SQL;
            oConexion.StoredProcedure = true;//Para indicar que es un procedimiento almacenado
            oConexion.AgregarParametro("@idRecepcion_Vehiculo", recepcion.IdRecepcion);

            if (oConexion.Consultar())
            {
                if (oConexion.Reader.HasRows)
                {
                    //Primero hay que poner a leer el reader
                    oConexion.Reader.Read();
                    //Hay información y se captura
                    recepcion.IdRecepcion = oConexion.Reader.GetInt32(0);
                    //recepcion.IdVehiculo = oConexion.Reader.GetInt32(1);
                    //recepcion.IdCliente = oConexion.Reader.GetInt32(2);
                    //recepcion.FechaIngreso = oConexion.Reader.GetDateTime(3);
                    //recepcion.FechaSalida = oConexion.Reader.GetDateTime(4);
                    recepcion.CambioAceite = oConexion.Reader.GetBoolean(5);
                    recepcion.DescripcionRecepcion = oConexion.Reader.GetString(6);
                    
                    return true;
                }
                else
                {
                    //No hay datos, se levanta un error
                    recepcion.Error = "No hay datos para el recepcion con el Id: " + recepcion.IdCliente;
                    return false;
                }
            }
            else
            {
                recepcion.Error = oConexion.Error;
                return false;
            }
        }
        public string Eliminar()
        {
            string SQL = "RecepcionVehiculo_Eliminar";//procendimiento almacenado de insertar
            clsConexion oConexion = new clsConexion();
            oConexion.SQL = SQL;
            oConexion.StoredProcedure = true; //Para indicar que es un procedimiento almacenado
            oConexion.AgregarParametro("@idRecepcion_Vehiculo", recepcion.IdRecepcion);

            if (oConexion.EjecutarSentencia())
            {
                return "Producto Eliminado correctamente";
            }
            else
            {
                recepcion.Error = oConexion.Error;
                return recepcion.Error;
            }
        }


    }
}