using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;


namespace UPP.Model
{
    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; }
        public virtual string Firstname { get; set; }
        public virtual string Lastname { get; set; }
        public DateTime Dob { get; set; }
        public virtual int EquityId { get; set; }
        public virtual int GenderId { get; set; }
        public virtual string EmployeeNo { get; set; }
        public virtual string Email { get; set; }
        public virtual string Website { get; set; }
        public virtual string Contact { get; set; }
        public  virtual string Bio { get; set; }

        [ForeignKey("EmployeeDepartment")]
        //[ForeignKey(nameof(Employee.EmployeeDepartment))]
        public virtual int EmpDeptId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public virtual Equity Equity { get; set; }
        public virtual Gender Gender { get; set; }
        public virtual EmployeeDepartment EmployeeDepartment { get; set; }

    }
}
