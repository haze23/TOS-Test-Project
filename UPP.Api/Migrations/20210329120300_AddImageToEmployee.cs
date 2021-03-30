using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace UPP.Api.Migrations
{
    public partial class AddImageToEmployee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.AlterColumn<DateTime>(
            //    name: "EndDate",
            //    table: "Employees",
            //    type: "datetime2",
            //    nullable: true,
            //    oldClrType: typeof(DateTime),
            //    oldType: "datetime2");

            migrationBuilder.AddColumn<string>(
                name: "imageUrl",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            //migrationBuilder.UpdateData(
            //    table: "Employees",
            //    keyColumn: "EmployeeId",
            //    keyValue: 1,
            //    column: "EndDate",
            //    value: null);

            //migrationBuilder.UpdateData(
            //    table: "Employees",
            //    keyColumn: "EmployeeId",
            //    keyValue: 2,
            //    column: "EndDate",
            //    value: null);

            //migrationBuilder.UpdateData(
            //    table: "Employees",
            //    keyColumn: "EmployeeId",
            //    keyValue: 3,
            //    column: "EndDate",
            //    value: null);

            //migrationBuilder.UpdateData(
            //    table: "Employees",
            //    keyColumn: "EmployeeId",
            //    keyValue: 4,
            //    column: "EndDate",
            //    value: null);

            //migrationBuilder.UpdateData(
            //    table: "Employees",
            //    keyColumn: "EmployeeId",
            //    keyValue: 5,
            //    column: "EndDate",
            //    value: null);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "imageUrl",
                table: "Employees");

            //migrationBuilder.AlterColumn<DateTime>(
            //    name: "EndDate",
            //    table: "Employees",
            //    type: "datetime2",
            //    nullable: false,
            //    defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
            //    oldClrType: typeof(DateTime),
            //    oldType: "datetime2",
            //    oldNullable: true);

            //migrationBuilder.UpdateData(
            //    table: "Employees",
            //    keyColumn: "EmployeeId",
            //    keyValue: 1,
            //    column: "EndDate",
            //    value: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            //migrationBuilder.UpdateData(
            //    table: "Employees",
            //    keyColumn: "EmployeeId",
            //    keyValue: 2,
            //    column: "EndDate",
            //    value: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            //migrationBuilder.UpdateData(
            //    table: "Employees",
            //    keyColumn: "EmployeeId",
            //    keyValue: 3,
            //    column: "EndDate",
            //    value: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            //migrationBuilder.UpdateData(
            //    table: "Employees",
            //    keyColumn: "EmployeeId",
            //    keyValue: 4,
            //    column: "EndDate",
            //    value: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            //migrationBuilder.UpdateData(
            //    table: "Employees",
            //    keyColumn: "EmployeeId",
            //    keyValue: 5,
            //    column: "EndDate",
            //    value: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
