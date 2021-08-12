using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UPP.Api.Model
{
    public class WeightType
    {
        [Key]
        public int WeightTypeId { get; set; }
        public int WeightTypeDesc { get; set; }
        public bool IsActive { get; set; }
    }
}
