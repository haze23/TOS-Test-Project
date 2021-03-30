﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using UPP.Model;

namespace UPP.Api.Migrations
{
    [DbContext(typeof(DbEntites))]
    partial class DbEntitesModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.4")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("UPP.Model.Employee", b =>
                {
                    b.Property<int>("EmployeeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Bio")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Contact")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Dob")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("EmpDeptId")
                        .HasColumnType("int");

                    b.Property<string>("EmployeeNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("EquityId")
                        .HasColumnType("int");

                    b.Property<string>("Firstname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("GenderId")
                        .HasColumnType("int");

                    b.Property<string>("IdentityNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Lastname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Website")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("imageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("EmployeeId");

                    b.HasIndex("EmpDeptId");

                    b.HasIndex("EquityId");

                    b.HasIndex("GenderId");

                    b.ToTable("Employees");

                    b.HasData(
                        new
                        {
                            EmployeeId = 1,
                            Contact = "0791814332",
                            Dob = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "infor@walden.co.za",
                            EmpDeptId = 0,
                            EmployeeNo = "EMP-0124",
                            EquityId = 1,
                            Firstname = "Walden",
                            GenderId = 1,
                            Lastname = "Schmidt",
                            StartDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Website = "www.walden.co.za"
                        },
                        new
                        {
                            EmployeeId = 2,
                            Contact = "0718798898",
                            Dob = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "infor@roselee.co.za",
                            EmpDeptId = 0,
                            EmployeeNo = "EMP-0088",
                            EquityId = 2,
                            Firstname = "RoseLee",
                            GenderId = 2,
                            Lastname = "Cheryl",
                            StartDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Website = "www.roselee.co.za"
                        },
                        new
                        {
                            EmployeeId = 3,
                            Contact = "0670058981",
                            Dob = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "infor@evans.co.za",
                            EmpDeptId = 0,
                            EmployeeNo = "EMP-0136",
                            EquityId = 1,
                            Firstname = "Evans",
                            GenderId = 1,
                            Lastname = "Mazi",
                            StartDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Website = "www.evans.co.za"
                        },
                        new
                        {
                            EmployeeId = 4,
                            Contact = "0791814332",
                            Dob = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "infor@kagiso.co.za",
                            EmpDeptId = 0,
                            EmployeeNo = "EMP-0461",
                            EquityId = 1,
                            Firstname = "Kagiso",
                            GenderId = 1,
                            Lastname = "Mandla",
                            StartDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Website = "www.kagiso.co.za"
                        },
                        new
                        {
                            EmployeeId = 5,
                            Contact = "0791814332",
                            Dob = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "infor@caroline.co.za",
                            EmpDeptId = 0,
                            EmployeeNo = "EMP-0661",
                            EquityId = 2,
                            Firstname = "Caroline",
                            GenderId = 2,
                            Lastname = "Smith",
                            StartDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Website = "www.caroline.co.za"
                        });
                });

            modelBuilder.Entity("UPP.Model.EmployeeDepartment", b =>
                {
                    b.Property<int>("EmpDeptId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("ActiveYn")
                        .HasColumnType("bit");

                    b.Property<string>("EmpDeptDesc")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("EmpDeptId");

                    b.ToTable("EmployeeDepartments");
                });

            modelBuilder.Entity("UPP.Model.Equity", b =>
                {
                    b.Property<int>("EquityId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("EquityCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EquityDesc")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("EquityId");

                    b.ToTable("Equities");

                    b.HasData(
                        new
                        {
                            EquityId = 1,
                            EquityCode = "BLK",
                            EquityDesc = "Black"
                        },
                        new
                        {
                            EquityId = 2,
                            EquityCode = "WHT",
                            EquityDesc = "White"
                        });
                });

            modelBuilder.Entity("UPP.Model.Gender", b =>
                {
                    b.Property<int>("GenderId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("GenderCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("GenderDesc")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("GenderId");

                    b.ToTable("Genders");

                    b.HasData(
                        new
                        {
                            GenderId = 1,
                            GenderCode = "M",
                            GenderDesc = "Male"
                        },
                        new
                        {
                            GenderId = 2,
                            GenderCode = "F",
                            GenderDesc = "Female"
                        });
                });

            modelBuilder.Entity("UPP.Model.Employee", b =>
                {
                    b.HasOne("UPP.Model.EmployeeDepartment", "EmployeeDepartment")
                        .WithMany()
                        .HasForeignKey("EmpDeptId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("UPP.Model.Equity", "Equity")
                        .WithMany()
                        .HasForeignKey("EquityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("UPP.Model.Gender", "Gender")
                        .WithMany()
                        .HasForeignKey("GenderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("EmployeeDepartment");

                    b.Navigation("Equity");

                    b.Navigation("Gender");
                });
#pragma warning restore 612, 618
        }
    }
}
