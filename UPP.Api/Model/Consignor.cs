using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace UPP.Api.Model
{
    public class Consignor
    {
        [Key]
        public int ConsignorId { get; set; }
        public string ConsignorName { get; set; }
        public int Address { get; set; }

        [ForeignKey("Country")]
        public virtual int CountryId { get; set; }

        [ForeignKey("Province")]
        public int ProvinceId { get; set; }

        [ForeignKey("Area")]
        public int AreaId { get; set; }
        public string ContactNo { get; set; }
        public string Email { get; set; }
        public virtual Country Country { get; set; }
        public virtual Province Province { get; set; }
        public virtual Area Area { get; set; }

    }
}
