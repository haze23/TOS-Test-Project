using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UPP.Api.Model
{
    public class EmployeeDepartmentDTO
    {
        public int EmpDeptId { get; set; }
        public string EmpDeptDesc { get; set; }
        public bool ActiveYn { get; set; }
    }
}
