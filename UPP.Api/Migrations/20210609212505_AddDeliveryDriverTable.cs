using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace UPP.Api.Migrations
{
    public partial class AddDeliveryDriverTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DeliveryDriver",
                columns: table => new
                {
                    DeliveryDriverId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DeliveryId = table.Column<int>(type: "int", nullable: false),
                    DriverId = table.Column<int>(type: "int", nullable: false),
                    AssistantId = table.Column<int>(type: "int", nullable: false),
                    createdDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    updatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    isActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliveryDriver", x => x.DeliveryDriverId);
                    table.ForeignKey(
                        name: "FK_DeliveryDriver_Delivery_DeliveryId",
                        column: x => x.DeliveryId,
                        principalTable: "Delivery",
                        principalColumn: "DeliveryId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DeliveryDriver_Employees_DriverId",
                        column: x => x.DriverId,
                        principalTable: "Employees",
                        principalColumn: "EmployeeId",
                        onDelete: ReferentialAction.Cascade);

                    table.ForeignKey(
                        name: "FK_DeliveryDriver_Employees_AssistantId",
                        column: x => x.AssistantId,
                        principalTable: "Employees",
                        principalColumn: "EmployeeId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryDriver_DeliveryId",
                table: "DeliveryDriver",
                column: "DeliveryId");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryDriver_driverId",
                table: "DeliveryDriver",
                column: "driverId");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryDriver_assistantId",
                table: "DeliveryDriver",
                column: "assistantId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DeliveryDriver");
        }
    }
}
