using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using TallerDeAutos.Clases;
using TallerDeAutos.Modelos;

namespace TallerDeAutos.Controladores
{
    /// <summary>
    /// Summary description for ControladorRecepcionVehiculo
    /// </summary>
    public class ControladorRecepcionVehiculo : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            try
            {
                string DatosRecepcionVehiculo;
                StreamReader reader = new StreamReader(context.Request.InputStream);
                DatosRecepcionVehiculo = reader.ReadToEnd();
                RecepcionVehiculo recepcion = JsonConvert.DeserializeObject<RecepcionVehiculo>(DatosRecepcionVehiculo);

                context.Response.Write(ProcesarComando(recepcion));
            }
            catch (Exception ex)
            {
                context.Response.Write(ex.Message);
            }
        }

        private string ProcesarComando(RecepcionVehiculo recepcion)
        {
            clsRecepcionVehiculo oRecepcion = new clsRecepcionVehiculo();
            oRecepcion.recepcion = recepcion;
            switch (recepcion.Comando.ToUpper())
            {
                case "INSERTAR":
                    return oRecepcion.Insertar();

                case "ACTUALIZAR":
                    return oRecepcion.Actualizar();
                    
                case "CONSULTAR":
                    if (oRecepcion.Consultar())
                    {
                        return JsonConvert.SerializeObject(oRecepcion.recepcion);
                    }
                    else
                    {
                        return oRecepcion.recepcion.Error;
                    }

                case "ELIMINAR":
                    return oRecepcion.Eliminar();

                default:
                    return "Comando no encontrado";
            }
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