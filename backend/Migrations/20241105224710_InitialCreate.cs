using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    UserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: true),
                    SecurityStamp = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Locations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Country = table.Column<string>(type: "text", nullable: false),
                    Lat = table.Column<decimal>(type: "numeric", nullable: false),
                    Lon = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Locations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    ProviderKey = table.Column<string>(type: "text", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    RoleId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "7502f723-5a5a-48a4-bb3e-260139296c2a", null, "Admin", "ADMIN" },
                    { "f9f641c7-ac92-4b1d-9b6a-3d90a8f84d84", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Paris', 'France', 48.8566, 2.3522);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Kyoto', 'Japan', 35.0116, 135.7681);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Dubai', 'UAE', 25.2048, 55.2708);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Rome', 'Italy', 41.9028, 12.4964);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Sydney', 'Australia', -33.8688, 151.2093);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('New York City', 'USA', 40.7128, -74.0060);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Cape Town', 'South Africa', -33.9249, 18.4241);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Santorini', 'Greece', 36.3932, 25.4615);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Machu Picchu', 'Peru', -13.1631, -72.5450);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Istanbul', 'Turkey', 41.0082, 28.9784);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Hong Kong', 'China', 22.3193, 114.1694);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Petra', 'Jordan', 30.3285, 35.4444);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Barcelona', 'Spain', 41.3851, 2.1734);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Rio de Janeiro', 'Brazil', -22.9068, -43.1729);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Amsterdam', 'Netherlands', 52.3676, 4.9041);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Beijing', 'China', 39.9042, 116.4074);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Prague', 'Czech Republic', 50.0755, 14.4378);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Edinburgh', 'Scotland', 55.9533, -3.1883);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Seoul', 'South Korea', 37.5665, 126.9780);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Marrakech', 'Morocco', 31.6295, -7.9811);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Great Wall of China', 'China', 40.4319, 116.5704);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('The Maldives', 'Maldives', 3.2028, 73.2207);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Venice', 'Italy', 45.4408, 12.3155);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Grand Canyon', 'USA', 36.1069, -112.1129);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Singapore', 'Singapore', 1.3521, 103.8198);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Banff', 'Canada', 51.1784, -115.5708);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Bali', 'Indonesia', -8.3405, 115.0920);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Jerusalem', 'Israel', 31.7683, 35.2137);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Vienna', 'Austria', 48.2082, 16.3738);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Cusco', 'Peru', -13.5319, -71.9675);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Cairo', 'Egypt', 30.0444, 31.2357);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Havana', 'Cuba', 23.1136, -82.3666);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Lisbon', 'Portugal', 38.7223, -9.1393);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Buenos Aires', 'Argentina', -34.6037, -58.3816);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('London', 'UK', 51.5074, -0.1278);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Kathmandu', 'Nepal', 27.7172, 85.3240);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Florence', 'Italy', 43.7696, 11.2558);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Queenstown', 'New Zealand', -45.0312, 168.6626);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Moscow', 'Russia', 55.7558, 37.6173);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Berlin', 'Germany', 52.5200, 13.4050);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Athens', 'Greece', 37.9838, 23.7275);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Bangkok', 'Thailand', 13.7563, 100.5018);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Los Angeles', 'USA', 34.0522, -118.2437);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Iguazu Falls', 'Argentina/Brazil', -25.6953, -54.4367);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Vancouver', 'Canada', 49.2827, -123.1207);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Stockholm', 'Sweden', 59.3293, 18.0686);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Seychelles', 'Seychelles', -4.6796, 55.4920);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Zurich', 'Switzerland', 47.3769, 8.5417);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Helsinki', 'Finland', 60.1699, 24.9384);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Luxor', 'Egypt', 25.6872, 32.6396);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Reykjavik', 'Iceland', 64.1355, -21.8954);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('Montreal', 'Canada', 45.5017, -73.5673);");
            migrationBuilder.Sql(@"INSERT INTO ""Locations"" (""Name"", ""Country"", ""Lat"", ""Lon"") 
                               VALUES ('San Francisco', 'USA', 37.7749, -122.4194);");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Locations");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
