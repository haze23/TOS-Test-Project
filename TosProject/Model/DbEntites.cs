using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TosProject.Model
{
    public class DbEntites: DbContext
    {

        public DbEntites()
        {
        }

        public DbEntites(DbContextOptions<DbEntites> options)
            : base(options)
        {
        }
        public virtual DbSet<Employee> Employees { get; set; }


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
                new Employee { Id = 1, Firstname = "Walden", Lastname = "Schmidt", EmployeeNo = "EMP-0124", Website = "www.walden.co.za", Email = "infor@walden.co.za", Contact = "0791814332" },
                new Employee { Id = 2, Firstname = "RoseLee", Lastname = "Cheryl", EmployeeNo = "EMP-0088", Website = "www.roselee.co.za", Email = "infor@roselee.co.za", Contact = "0718798898" },
                new Employee { Id = 3, Firstname = "Evans", Lastname = "Mazi", EmployeeNo = "EMP-0136", Website = "www.evans.co.za", Email = "infor@evans.co.za", Contact = "0670058981" },
                new Employee { Id = 4, Firstname = "Kagiso", Lastname = "Mandla", EmployeeNo = "EMP-0461", Website = "www.kagiso.co.za", Email = "infor@kagiso.co.za", Contact = "0791814332" },
                new Employee { Id = 5, Firstname = "Caroline", Lastname = "Smith", EmployeeNo = "EMP-0661", Website = "www.caroline.co.za", Email = "infor@caroline.co.za", Contact = "0791814332" }
            );

        }

    }
}
