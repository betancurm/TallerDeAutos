using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TallerDeAutos.Modelos
{
    public class Repuesto
    {
        public int IdRepuesto { get; set; }
        public string Referencia { get; set; }
        public string Nombre { get; set; }
        public float ValorUnitario { get; set; }
        public string Descripcion { get; set; }
        public int MarcaRepuesto { get; set; }
        public string Comando { get; set; }
        public string Error { get; set; }
    }
}