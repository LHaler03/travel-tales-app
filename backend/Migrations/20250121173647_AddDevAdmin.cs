using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddDevAdmin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "05631b08-94c8-4ba1-bace-d85a570cc76f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d9a10e40-4ae8-4f04-abc7-f83742a70d6f");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "00381a0b-4b7b-485f-b13d-780b1f3b5513", null, "User", "USER" },
                    { "5248bd4c-719b-4669-a354-32586041d631", null, "Admin", "ADMIN" }
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
                    "5248bd4c-719b-4669-a354-32586041d631" // This is your Admin role ID from earlier in the migration
                });

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "00381a0b-4b7b-485f-b13d-780b1f3b5513");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5248bd4c-719b-4669-a354-32586041d631");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "05631b08-94c8-4ba1-bace-d85a570cc76f", null, "Admin", "ADMIN" },
                    { "d9a10e40-4ae8-4f04-abc7-f83742a70d6f", null, "User", "USER" }
                });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "UserId", "RoleId" },
                keyValues: new object[] { "admin", "5248bd4c-719b-4669-a354-32586041d631" });

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "admin");
        }
    }
}
