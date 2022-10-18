﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TallerDeAutos.Controladores
{
    /// <summary>
    /// Summary description for ControladorCliente
    /// </summary>
    public class ControladorCliente : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.Write("Hello World");
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