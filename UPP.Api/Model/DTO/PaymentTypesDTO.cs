using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UPP.Api.Model.DTO
{
    public class PaymentTypesDTO
    {
        public int PaymentTypesId { get; set; }
        public string PaymentTypesDesc { get; set; }
        public bool Active { get; set; }
    }
}
