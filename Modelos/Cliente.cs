using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TallerDeAutos.Modelos
{
    public class Cliente
    {
        public int IdCliente { get; set; }
        public string Nombre { get; set; }
        public string PrimerApellido { get; set; }
        public string SegundoApellido { get; set; }
        public string Telefono { get; set; }
        public string Correo { get; set; }
        public string Documento { get; set; }
        public int TipoDocumento { get; set; }
        public int MarcaVehiculo { get; set; }
        public string PlacaVehiculo { get; set; }
        public string Comando { get; set; }
        public string Error { get; set; }
    }
}