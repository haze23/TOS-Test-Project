using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UPP.Api.Model
{
    public class TransmissionType
    {
        [Key]
        public int TransmissionTypeId { get; set; }
        public string TransmissionTypeDesc { get; set; }
    }
}
