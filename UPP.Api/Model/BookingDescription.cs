using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace UPP.Api.Model
{
    public class BookingDescription
    {
        [Key]
        public int BookingDescriptionId { get; set; }

        [ForeignKey("Booking")]
        public int BookingId { get; set; }
        public virtual int Quantity { get; set; }

        [ForeignKey("WeightType")]
        public virtual int WeightTypeId { get; set; }
        public virtual decimal ActualWeight { get; set; }
        public virtual decimal GrossWeight { get; set; }

        [ForeignKey("Rate")]
        public virtual int RateId { get; set; }
        public virtual decimal RateCharge { get; set; }
        public virtual decimal Total { get; set; }
        public virtual string Createdby  { get; set; }
        public virtual string CreatedDate { get; set; }
        public virtual Booking Booking { get; set; }
        public virtual WeightType WeightType { get; set; }
        public virtual Rate Rate { get; set; }
    }
}
