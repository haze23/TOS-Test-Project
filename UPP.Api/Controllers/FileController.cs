using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Hosting;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace UPP.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private IHostEnvironment _hostEnvironment;

        public FileController(IHostEnvironment hostEnvironment)
        {
            _hostEnvironment = hostEnvironment;
        }
        [HttpGet]
        [Route("downloadBulkEmployeeTemplate")]
        public async Task<IActionResult> GetBulkEmployeeUploadTemplate()
        {
            try
            {
                string uploadsFolder = Path.Combine(_hostEnvironment.ContentRootPath, "Uploads");

                var fileName = $"Employee Upload Template.xlsx";
                var filepath = _hostEnvironment.ContentRootPath + "/Uploads/" + fileName;

                var mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

                byte[] fileBytes = System.IO.File.ReadAllBytes(filepath);
                return File(fileBytes, mimeType, fileName);
            }
            catch (Exception ex)
            {
                string path = Path.Combine(_hostEnvironment.ContentRootPath, "Log.txt");
                System.IO.File.AppendAllText(@path, Environment.NewLine + DateTime.Now.ToString() + ex.ToString() + Environment.NewLine + "Error occured in  GetBulkEmployeeUploadTemplate method");
                return null;
            }
        }

        [NonAction]
        private  string GetContentType(string path)
        {
            var provider = new FileExtensionContentTypeProvider();
            string contentType;

            if (!provider.TryGetContentType(path, out contentType))
            {
                contentType = "application/octet-stream";
            }

            return contentType;
        }
    }
}
