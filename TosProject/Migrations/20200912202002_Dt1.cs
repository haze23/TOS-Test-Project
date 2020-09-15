using Microsoft.EntityFrameworkCore.Migrations;

namespace TosProject.Migrations
{
    public partial class Dt1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Firstname = table.Column<string>(nullable: true),
                    Lastname = table.Column<string>(nullable: true),
                    EmployeeNo = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Website = table.Column<string>(nullable: true),
                    Contact = table.Column<string>(nullable: true),
                    Bio = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Employees",
                columns: new[] { "Id", "Bio", "Contact", "Email", "EmployeeNo", "Firstname", "Lastname", "Website" },
                values: new object[,]
                {
                    { 1, null, "0791814332", "infor@walden.co.za", "EMP-0124", "Walden", "Schmidt", "www.walden.co.za" },
                    { 2, null, "0718798898", "infor@roselee.co.za", "EMP-0088", "RoseLee", "Cheryl", "www.roselee.co.za" },
                    { 3, null, "0670058981", "infor@evans.co.za", "EMP-0136", "Evans", "Mazi", "www.evans.co.za" },
                    { 4, null, "0791814332", "infor@kagiso.co.za", "EMP-0461", "Kagiso", "Mandla", "www.kagiso.co.za" },
                    { 5, null, "0791814332", "infor@caroline.co.za", "EMP-0661", "Caroline", "Smith", "www.caroline.co.za" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Employees");
        }
    }
}
