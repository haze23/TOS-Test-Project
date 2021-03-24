using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace UPP.Model
{
    public class DbEntites: DbContext
    {

        //public DbEntites()
        //{
        //}

        public DbEntites(DbContextOptions<DbEntites> options)
            : base(options)
        {
        }
        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<Equity> Equities { get; set; }
        public virtual DbSet<Gender> Genders { get; set; }
        public virtual DbSet<EmployeeDepartment> EmployeeDepartments { get; set; }




        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;;Database=TosDb;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Employee>().HasData(
                new Employee { EmployeeId = 1, Firstname = "Walden", Lastname = "Schmidt",EquityId = 1, GenderId = 1, EmployeeNo = "EMP-0124", Website = "www.walden.co.za", Email = "infor@walden.co.za", Contact = "0791814332" },
                new Employee { EmployeeId = 2, Firstname = "RoseLee", Lastname = "Cheryl", EquityId = 2, GenderId = 2, EmployeeNo = "EMP-0088", Website = "www.roselee.co.za", Email = "infor@roselee.co.za", Contact = "0718798898" },
                new Employee { EmployeeId = 3, Firstname = "Evans", Lastname = "Mazi", EquityId = 1, GenderId = 1, EmployeeNo = "EMP-0136", Website = "www.evans.co.za", Email = "infor@evans.co.za", Contact = "0670058981" },
                new Employee { EmployeeId = 4, Firstname = "Kagiso", Lastname = "Mandla", EquityId = 1, GenderId = 1, EmployeeNo = "EMP-0461", Website = "www.kagiso.co.za", Email = "infor@kagiso.co.za", Contact = "0791814332" },
                new Employee { EmployeeId = 5, Firstname = "Caroline", Lastname = "Smith", EquityId = 2, GenderId = 2, EmployeeNo = "EMP-0661", Website = "www.caroline.co.za", Email = "infor@caroline.co.za", Contact = "0791814332" }
            );

            builder.Entity<Gender>().HasData(
                new Gender {GenderId = 1, GenderDesc = "Male", GenderCode = "M" },
                new Gender { GenderId = 2, GenderDesc = "Female", GenderCode = "F" }
            );

            builder.Entity<Equity>().HasData(
                new Equity { EquityId = 1, EquityDesc = "Black", EquityCode = "BLK" },
                new Equity { EquityId = 2, EquityDesc = "White", EquityCode = "WHT" }
            );

        }

    }
}
