using Microsoft.EntityFrameworkCore.Migrations;

namespace UPP.Api.Migrations
{
    public partial class UpdateEmployeeTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IdentityNo",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            //migrationBuilder.UpdateData(
            //    table: "Employees",
            //    keyColumn: "EmployeeId",
            //    keyValue: 1,
            //    column: "EmpDeptId",
            //    value: 0);

            //migrationBuilder.UpdateData(
            //    table: "Employees",
            //    keyColumn: "EmployeeId",
            //    keyValue: 2,
            //    column: "EmpDeptId",
            //    value: 0);

            //migrationBuilder.UpdateData(
            //    table: "Employees",
            //    keyColumn: "EmployeeId",
            //    keyValue: 3,
            //    column: "EmpDeptId",
            //    value: 0);

            //migrationBuilder.UpdateData(
            //    table: "Employees",
            //    keyColumn: "EmployeeId",
            //    keyValue: 4,
            //    column: "EmpDeptId",
            //    value: 0);

            //migrationBuilder.UpdateData(
            //    table: "Employees",
            //    keyColumn: "EmployeeId",
            //    keyValue: 5,
            //    column: "EmpDeptId",
            //    value: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "IdentityNo",
                table: "Employees");

            //migrationBuilder.UpdateData(
            //    table: "Employees",
            //    keyColumn: "EmployeeId",
            //    keyValue: 1,
            //    column: "EmpDeptId",
            //    value: 1);

            //migrationBuilder.UpdateData(
            //    table: "Employees",
            //    keyColumn: "EmployeeId",
            //    keyValue: 2,
            //    column: "EmpDeptId",
            //    value: 2);

            //migrationBuilder.UpdateData(
            //    table: "Employees",
            //    keyColumn: "EmployeeId",
            //    keyValue: 3,
            //    column: "EmpDeptId",
            //    value: 3);

            //migrationBuilder.UpdateData(
            //    table: "Employees",
            //    keyColumn: "EmployeeId",
            //    keyValue: 4,
            //    column: "EmpDeptId",
            //    value: 1);

            //migrationBuilder.UpdateData(
            //    table: "Employees",
            //    keyColumn: "EmployeeId",
            //    keyValue: 5,
            //    column: "EmpDeptId",
            //    value: 4);
        }
    }
}
