using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class EmailMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserName",
                table: "Timesheet",
                newName: "Email_ID");

            migrationBuilder.AddColumn<string>(
                name: "Email_ID",
                table: "Users",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email_ID",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "Email_ID",
                table: "Timesheet",
                newName: "UserName");
        }
    }
}
