using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UPP.Model
{
    public class EmployeeDTO
    {
        public int EmployeeId { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string IdentityNo { get; set; }

        //[DataType(DataType.Date)]
        //[DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd-MM-yyyy}")]
        public DateTime Dob { get; set; }
        public  int EquityId { get; set; }
        public string EquityDesc { get; internal set; }

        public int GenderId { get; set; }
        public string GenderDesc { get; internal set; }
        public string EmployeeNo { get; set; }
        public string Email { get; set; }
        public string Website { get; set; }
        public string Contact { get; set; }
        public virtual string Address { get; set; }
        public string Bio { get; set; }
        public  int EmpDeptId { get; set; }
        public string EmpDeptDesc { get; internal set; }

        public string ImageUrl { get; set; }

        //[DataType(DataType.Date)]
        //[DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd-MM-yyyy}")]
        public DateTime StartDate { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd-MM-yyyy}")]
        public DateTime? EndDate { get; set; }
    }
}
