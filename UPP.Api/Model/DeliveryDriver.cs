using System;
using System.ComponentModel.DataAnnotations.Schema;
using UPP.Model;

namespace UPP.Api.Model
{
    public class DeliveryDriver
    {
        public int DeliveryDriverId { get; set; }

        [ForeignKey("Delivery")]
        public int DeliveryId { get; set; }

        [ForeignKey("Employee")]
        public virtual int DriverId { get; set; }

        //[ForeignKey("Employee")]
        public virtual int AssistantId { get; set; }
        public DateTime createdDate { get; set; }
        public DateTime updatedDate { get; set; }
        public bool isActive { get; set; }
        public virtual Delivery Delivery { get; set; }

        public virtual Employee Employee { get; set; }

    }
}
