using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UPP.Api.Model
{
    public class Rate
    {
        [Key]
        public virtual int RateId { get; set; }
        public virtual string RateDesc { get; set; }
    }
}
