using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UPP.Api.Model.DTO
{
    public class ProvinceDTO
    {
        public int ProvinceId { get; set; }
        public string ProvinceName { get; set; }
        public string ProvinceCode { get; set; }
        public bool IsActive { get; set; }
    }
}
