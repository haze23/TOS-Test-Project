using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UPP.Api.Model
{
    public class FuelType
    {
        [Key]
        public int FuelTypeId { get; set; }
        public string FuelTypeDesc { get; set; }
    }
}
