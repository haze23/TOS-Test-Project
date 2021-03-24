using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using UPP.Model;

namespace UPP.Model
{
    public partial class Equity
    {
        [Key]
        public  int EquityId { get; set; }
        public virtual string EquityCode { get; set; }
        public virtual string EquityDesc { get; set; }
    }
}
