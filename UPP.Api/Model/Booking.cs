using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UPP.Api.Model
{
    public class Booking
    {
        [Key]
        public int BookingId { get; set; }
        public string BookingNo { get; set; }
        public int ConsignorId { get; set; }
        public int ConsigneeId { get; set; }
        public virtual string FromLocation { get; set; }
        public string ToLocation { get; set; }
        public DateTime BookingDate { get; set; }
        public DateTime RequiredDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
