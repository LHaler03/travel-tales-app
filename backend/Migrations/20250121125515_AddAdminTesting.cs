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

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { 
                    "Id", 
                    "UserName", 
                    "NormalizedUserName", 
                    "Email", 
                    "NormalizedEmail", 
                    "EmailConfirmed", 
                    "PasswordHash", 
                    "SecurityStamp",
                    "ConcurrencyStamp",
                    "PhoneNumberConfirmed",
                    "TwoFactorEnabled",
                    "LockoutEnabled",
                    "AccessFailedCount",
                    "FirstName",
                    "LastName",
                    "RefreshToken",
                    "RefreshTokenExpiry"
                },
                values: new object[] { 
                    "admin",
                    "admin",
                    "ADMIN",
                    "ttalesteam@gmail.com",
                    "TTALESTEAM@GMAIL.COM",
                    true,
                    "AQAAAAIAAYagAAAAEDhpZ4kt2cFvQ+pGKLVOEY0y+J9pSjXeAXfFpRF2jEaikzjk4U82uHP/5e0EVjd9ww==",
                    Guid.NewGuid().ToString(),
                    Guid.NewGuid().ToString(),
                    false,
                    false,
                    false,
                    0,
                    "Test",
                    "Admin",
                    "",
                    DateTime.UtcNow
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "UserId", "RoleId" },
                values: new object[] { 
                    "admin", // Same ID as above
                    "fd25606a-e653-4473-90b8-01acdba13fcc" // This is your Admin role ID from earlier in the migration
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "admin", "fd25606a-e653-4473-90b8-01acdba13fcc" });

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "admin");

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
