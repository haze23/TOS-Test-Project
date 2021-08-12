using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace UPP.Api.Model
{
    public class Truck
    {
        [Key]
        public int TruckId { get; set; }
        public virtual string TruckDesc { get; set; }
        public virtual string TruckNo { get; set; }

        [ForeignKey("TransmissionType")]
        public virtual int TransmissionTypeId { get; set; }

       [ForeignKey("FuelType")]
        public virtual int FuelTypeId { get; set; }
        public int Weight { get; set; }
        public virtual string LicencePlate { get; set; }
        public virtual bool IsActive { get; set; }
        public DateTime DatePurchased { get; set; }
        public DateTime DateSold { get; set; }
        public virtual TransmissionType TransmissionType { get; set; }
        public virtual FuelType FuelType { get; set; }

    }
}
