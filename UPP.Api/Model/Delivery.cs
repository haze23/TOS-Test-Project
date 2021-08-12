using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace UPP.Api.Model
{
    public class Delivery
    {
        [Key]
        public int DeliveryId { get; set; }

        [ForeignKey("Booking")]
        public int BookingId { get; set; }

        [ForeignKey("Truck")]
        public int TruckId { get; set; }
        public virtual DateTime DespatchTime { get; set; }
        public virtual DateTime ArrivalTime { get; set; }
        public bool IsActive { get; set; }
        public virtual Booking Booking { get; set; }
        public virtual Truck Truck { get; set; }

    }
}
