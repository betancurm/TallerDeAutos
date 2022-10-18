using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TallerDeAutos.Modelos
{
    public class RecepcionVehiculo
    {
        public int IdVehiculo { get; set; }
        public int IdCliente { get; set; }
        public bool CambioAceite { get; set; }
        public int IdRecepcion { get; set; }
        public DateTime? FechaIngreso { get; set; }
        public DateTime? FechaSalida { get; set; }
        public string DescripcionRecepcion { get; set; }
        public string Comando { get; set; }
        public string Error { get; set; }
    }
}