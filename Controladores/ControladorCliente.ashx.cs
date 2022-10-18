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
    /// Summary description for ControladorCliente
    /// </summary>
    public class ControladorCliente : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            try
            {
                string DatosCliente;
                StreamReader reader = new StreamReader(context.Request.InputStream);
                DatosCliente = reader.ReadToEnd();
                Cliente cliente = JsonConvert.DeserializeObject<Cliente>(DatosCliente);

                context.Response.Write(ProcesarComando(cliente));
            }
            catch (Exception ex)
            {
                context.Response.Write(ex.Message);
            }
        }

        private string ProcesarComando(Cliente cliente)
        {
            clsCliente oCliente = new clsCliente();
            oCliente.cliente = cliente;
            switch (cliente.Comando.ToUpper())
            {
                case "INSERTAR":
                    return oCliente.Insertar();
              
                case "ACTUALIZAR":
                    return oCliente.Actualizar();
                case "CONSULTAR":
                    if (oCliente.Consultar())
                    {
                        return JsonConvert.SerializeObject(oCliente.cliente);
                    }
                    else
                    {
                        return oCliente.cliente.Error;
                    }

                case "ELIMINAR":
                    return oCliente.Eliminar();

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