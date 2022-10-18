using libComunes.CapaDatos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TallerDeAutos.Modelos;

namespace TallerDeAutos.Clases
{
    public class clsRepuesto
    {
        public Repuesto repuesto { get; set; }
        public string Insertar()
        {
            //Invocar el método insertar
            //Método para grabar en la base de datos
            string SQL = "Repuesto_Insertar"; //Nombre del procedimiento almacenado

            clsConexion oConexion = new clsConexion();
            oConexion.SQL = SQL;
            oConexion.StoredProcedure = true;//Para indicar que es un procedimiento almacenado
            oConexion.AgregarParametro("@prReferencia", repuesto.Referencia);
            oConexion.AgregarParametro("@prNombre", repuesto.Nombre);
            oConexion.AgregarParametro("@prDescripcion", repuesto.Descripcion);
            oConexion.AgregarParametro("@prValorUnitario", repuesto.ValorUnitario);
            oConexion.AgregarParametro("@prMarcaRepuesto", repuesto.MarcaRepuesto);

            if (oConexion.EjecutarSentencia())
            {
                return "Se insertó el repuesto en la base de datos";
            }
            else
            {
                repuesto.Error = oConexion.Error;
                return repuesto.Error;
            }
        }
        public string Actualizar()
        {
            //Invocar el método insertar
            //Método para grabar en la base de datos
            string SQL = "Repuesto_Actualizar"; //Nombre del procedimiento almacenado

            clsConexion oConexion = new clsConexion();
            oConexion.SQL = SQL;
            oConexion.StoredProcedure = true;//Para indicar que es un procedimiento almacenado
            oConexion.AgregarParametro("@prIdRepuesto", repuesto.IdRepuesto);
            oConexion.AgregarParametro("@prReferencia", repuesto.Referencia);
            oConexion.AgregarParametro("@prNombre", repuesto.Nombre);
            oConexion.AgregarParametro("@prDescripcion", repuesto.Descripcion);
            oConexion.AgregarParametro("@prValorUnitario", repuesto.ValorUnitario);
            oConexion.AgregarParametro("@prMarcaRepuesto", repuesto.MarcaRepuesto);

            if (oConexion.EjecutarSentencia())
            {
                return "Se actualizó el repuesto en la base de datos";
            }
            else
            {
                repuesto.Error = oConexion.Error;
                return repuesto.Error;
            }
        }
        public string Eliminar()
        {
            //Invocar el método insertar
            //Método para grabar en la base de datos
            string SQL = "Repuesto_Eliminar"; //Nombre del procedimiento almacenado

            clsConexion oConexion = new clsConexion();
            oConexion.SQL = SQL;
            oConexion.StoredProcedure = true;//Para indicar que es un procedimiento almacenado
            oConexion.AgregarParametro("@prIdRepuesto", repuesto.IdRepuesto);

            if (oConexion.EjecutarSentencia())
            {
                return "Se eliminó el repuesto en la base de datos";
            }
            else
            {
                repuesto.Error = oConexion.Error;
                return repuesto.Error;
            }
        }
        public bool Consultar()
        {
            string SQL = "Repuesto_Consultar";

            clsConexion oConexion = new clsConexion();
            oConexion.SQL = SQL;
            oConexion.StoredProcedure = true;//Para indicar que es un procedimiento almacenado
            oConexion.AgregarParametro("@prCodigo", repuesto.IdRepuesto);

            if (oConexion.Consultar())
            {
                if (oConexion.Reader.HasRows)
                {
                    //Primero hay que poner a leer el reader
                    oConexion.Reader.Read();
                    //Hay información y se captura
                    repuesto.Nombre = oConexion.Reader.GetString(0);
                    repuesto.Descripcion = oConexion.Reader.GetString(1);
                    repuesto.ValorUnitario = oConexion.Reader.GetInt32(3);
                    //repuesto.MarcaRepuesto = oConexion.Reader.GetInt32(4);
                    return true;
                }
                else
                {
                    //No hay datos, se levanta un error
                    repuesto.Error = "No hay datos para el repuesto con código: " + repuesto.IdRepuesto;
                    return false;
                }
            }
            else
            {
                repuesto.Error = oConexion.Error;
                return false;
            }
        }

    }
}