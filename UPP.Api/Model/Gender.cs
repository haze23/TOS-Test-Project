using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace UPP.Model
{
    public partial class Gender
    {
        [Key]
        public int GenderId { get; set; }
        public string GenderCode { get; set; }
        public string GenderDesc { get; set; }
    }
}
