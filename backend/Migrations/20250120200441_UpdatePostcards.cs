using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePostcards : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6973dde7-e989-4d28-8a51-01e94ec60688");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d95f7d39-5f76-428b-8d37-e391831cfc3b");

            migrationBuilder.DropColumn(
                name: "ExpiresAt",
                table: "Postcards");

            migrationBuilder.RenameColumn(
                name: "Base64Image",
                table: "Postcards",
                newName: "S3Key");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "9ce14525-f89c-45b9-9489-b85334f9b053", null, "User", "USER" },
                    { "fd25606a-e653-4473-90b8-01acdba13fcc", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9ce14525-f89c-45b9-9489-b85334f9b053");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fd25606a-e653-4473-90b8-01acdba13fcc");

            migrationBuilder.RenameColumn(
                name: "S3Key",
                table: "Postcards",
                newName: "Base64Image");

            migrationBuilder.AddColumn<DateTime>(
                name: "ExpiresAt",
                table: "Postcards",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6973dde7-e989-4d28-8a51-01e94ec60688", null, "User", "USER" },
                    { "d95f7d39-5f76-428b-8d37-e391831cfc3b", null, "Admin", "ADMIN" }
                });
        }
    }
}
