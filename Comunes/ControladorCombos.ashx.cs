using System;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;
using System.Web;
using libComunes.CapaObjetos;

namespace TallerDeAutos.Comunes
{
    /// <summary>
    /// Descripción breve de ControladorCombos
    /// </summary>
    public class ControladorCombos : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string DatosCombo;
            StreamReader reader = new StreamReader(context.Request.InputStream);
            DatosCombo = reader.ReadToEnd();

            viewCombo vCombo = JsonConvert.DeserializeObject<viewCombo>(DatosCombo);
            string Respuesta;

            switch (vCombo.Comando.ToUpper())
            {

                case "LIBROS":
                    Respuesta = LlenarCombo(vCombo, "Libro_LlenarCombo");
                    break;
                case "TIPOPRODUCTO":
                   Respuesta = LlenarCombo(vCombo, "TipoProducto_LlenarCombo");
                   break;
                /*
                 case "Comando" -> corresponde al procedimiento que se quiere llenar
                    Respuesta = LlenarCombo(vCombo, "Nombre procedimiento que llena el combo";
                    break;                 
                /*
                case "LLENARCOMBOCAJEROS":
                    Respuesta = LlenarCombo(vCombo, "Empleado_ComboCajeros");
                    break;
                
                case "TIPOTELEFONO":
                    Respuesta = LlenarCombo(vCombo, "TipoTelefono_LlenarCombo");
                    break;
                case "PRODUCTOXTIPO":
                    Respuesta = LlenarCombo(vCombo, "Producto_LlenarComboXTipo");
                    break;
                */
                default:
                    Respuesta = "Comando sin definir";
                    break;
            }

            context.Response.Write(Respuesta);
        }
        private string LlenarCombo(viewCombo vCombo, string SQL)
        {
            vCombo.SQL = SQL;
            clsComboListas oCombo = new clsComboListas();
            oCombo.vCombo = vCombo;
            return JsonConvert.SerializeObject(oCombo.ListarCombos());
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}