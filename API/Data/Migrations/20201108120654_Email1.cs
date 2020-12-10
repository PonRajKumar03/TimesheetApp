using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class Email1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_EmailTbl",
                table: "EmailTbl");

            migrationBuilder.RenameTable(
                name: "EmailTbl",
                newName: "EmailTable");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EmailTable",
                table: "EmailTable",
                column: "ID");
        }
    }
}
