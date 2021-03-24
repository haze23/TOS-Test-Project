using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace UPP.Api.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EmployeeDepartments",
                columns: table => new
                {
                    EmpDeptId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmpDeptDesc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ActiveYn = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeDepartments", x => x.EmpDeptId);
                });

            migrationBuilder.CreateTable(
                name: "Equities",
                columns: table => new
                {
                    EquityId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EquityCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EquityDesc = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Equities", x => x.EquityId);
                });

            migrationBuilder.CreateTable(
                name: "Genders",
                columns: table => new
                {
                    GenderId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GenderCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GenderDesc = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Genders", x => x.GenderId);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    EmployeeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Firstname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Lastname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Dob = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EquityId = table.Column<int>(type: "int", nullable: false),
                    GenderId = table.Column<int>(type: "int", nullable: false),
                    EmployeeNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Website = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Contact = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Bio = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmpDeptId = table.Column<int>(type: "int", nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.EmployeeId);
                    table.ForeignKey(
                        name: "FK_Employees_EmployeeDepartments_EmpDeptId",
                        column: x => x.EmpDeptId,
                        principalTable: "EmployeeDepartments",
                        principalColumn: "EmpDeptId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Employees_Equities_EquityId",
                        column: x => x.EquityId,
                        principalTable: "Equities",
                        principalColumn: "EquityId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Employees_Genders_GenderId",
                        column: x => x.GenderId,
                        principalTable: "Genders",
                        principalColumn: "GenderId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Equities",
                columns: new[] { "EquityId", "EquityCode", "EquityDesc" },
                values: new object[,]
                {
                    { 1, "BLK", "Black" },
                    { 2, "WHT", "White" }
                });

            migrationBuilder.InsertData(
                table: "Genders",
                columns: new[] { "GenderId", "GenderCode", "GenderDesc" },
                values: new object[,]
                {
                    { 1, "M", "Male" },
                    { 2, "F", "Female" }
                });
            migrationBuilder.InsertData(
                table: "EmployeeDepartments",
                columns: new[] { "EmpDeptId", "EmpDeptDesc", "ActiveYn" },
                values: new object[,]
                {
                    { 1, "Admin", true },
                    { 2, "Software Dev.", true },
                    { 3, "Accounting", true },
                    { 4, "HR.", true },
                });

            migrationBuilder.InsertData(
                table: "Employees",
                columns: new[] { "EmployeeId", "Bio", "Contact", "Dob", "Email", "EmpDeptId", "EmployeeNo", "EndDate", "EquityId", "Firstname", "GenderId", "Lastname", "StartDate", "Website" },
                values: new object[,]
                {
                    { 1, null, "0791814332", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "infor@walden.co.za", 1, "EMP-0124", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "Walden", 1, "Schmidt", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "www.walden.co.za" },
                    { 3, null, "0670058981", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "infor@evans.co.za", 2, "EMP-0136", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "Evans", 1, "Mazi", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "www.evans.co.za" },
                    { 4, null, "0791814332", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "infor@kagiso.co.za", 3, "EMP-0461", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "Kagiso", 1, "Mandla", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "www.kagiso.co.za" },
                    { 2, null, "0718798898", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "infor@roselee.co.za", 1, "EMP-0088", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "RoseLee", 2, "Cheryl", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "www.roselee.co.za" },
                    { 5, null, "0791814332", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "infor@caroline.co.za", 4, "EMP-0661", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2, "Caroline", 2, "Smith", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "www.caroline.co.za" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmpDeptId",
                table: "Employees",
                column: "EmpDeptId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EquityId",
                table: "Employees",
                column: "EquityId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_GenderId",
                table: "Employees",
                column: "GenderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "EmployeeDepartments");

            migrationBuilder.DropTable(
                name: "Equities");

            migrationBuilder.DropTable(
                name: "Genders");
        }
    }
}
