using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DatingApp.API.Migrations
{
    public partial class RenamingPasswordToPasswordHash : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Password",
                table: "UserModels");

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordSalt",
                table: "UserModels",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                table: "UserModels");

            migrationBuilder.AddColumn<byte[]>(
                name: "Password",
                table: "UserModels",
                type: "varbinary(max)",
                nullable: true);
        }
    }
}
