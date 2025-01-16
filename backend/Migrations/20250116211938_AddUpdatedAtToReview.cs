using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddUpdatedAtToReview : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "59d2f1fe-41cc-45ca-a341-55bdc879b1bf");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c4b2273d-2445-4127-9609-529414f605ef");

            migrationBuilder.RenameColumn(
                name: "ImageUrl",
                table: "Postcards",
                newName: "Base64Image");

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "Reviews",
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                name: "UpdatedAt",
                table: "Reviews");

            migrationBuilder.RenameColumn(
                name: "Base64Image",
                table: "Postcards",
                newName: "ImageUrl");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "59d2f1fe-41cc-45ca-a341-55bdc879b1bf", null, "Admin", "ADMIN" },
                    { "c4b2273d-2445-4127-9609-529414f605ef", null, "User", "USER" }
                });
        }
    }
}
