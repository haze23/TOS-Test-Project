using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UPP.Model
{
    public class EmployeeDepartment
    {
        [Key]
        public int EmpDeptId { get; set; }
        public string EmpDeptDesc { get; set; }
        public bool ActiveYn { get; set; }
    }
}
