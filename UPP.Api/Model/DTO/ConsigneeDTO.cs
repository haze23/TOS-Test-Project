using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace UPP.Api.Model
{
    public class ConsigneeDTO
    {
        [Key]
        public int ConsigneeId { get; set; }
        public string ConsigneeName { get; set; }
        public int Address { get; set; }

        [ForeignKey("Country")]
        public virtual int CountryId { get; set; }

        [ForeignKey("Province")]
        public virtual int ProvinceId { get; set; }

        [ForeignKey("Area")]
        public virtual int AreaId { get; set; }
        public virtual string ContactNo { get; set; }
        public virtual string Email { get; set; }

        public virtual Country Country { get; set; }
        public virtual Province Province { get; set; }
        public virtual Area Area { get; set; }
    }
}
