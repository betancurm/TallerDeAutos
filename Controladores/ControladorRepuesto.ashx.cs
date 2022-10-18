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
    /// Descripción breve de ControladorRepuesto
    /// </summary>
    public class ControladorRepuesto : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            try
            {
                string DatosRepuesto;
                StreamReader reader = new StreamReader(context.Request.InputStream);
                DatosRepuesto = reader.ReadToEnd();
                Repuesto repuesto = JsonConvert.DeserializeObject<Repuesto>(DatosRepuesto);

                context.Response.Write(ProcesarComando(repuesto));
            }
            catch (Exception ex)
            {
                context.Response.Write(ex.Message);
            }
        }
        private string ProcesarComando(Repuesto repuesto)
        {
            clsRepuesto oRepuesto = new clsRepuesto();
            oRepuesto.repuesto = repuesto;
            switch (repuesto.Comando.ToUpper())
            {
                case "INSERTAR":
                    return oRepuesto.Insertar();
                case "ACTUALIZAR":
                    return oRepuesto.Actualizar();
                case "ELIMINAR":
                    return oRepuesto.Eliminar();
                case "CONSULTAR":
                    if (oRepuesto.Consultar())
                    {
                        return JsonConvert.SerializeObject(oRepuesto.repuesto);
                    }
                    else
                    {
                        return oRepuesto.repuesto.Error;
                    }
                default:
                    return "No se ha definido el comando";
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