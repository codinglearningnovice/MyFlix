using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyFlixBackendc_.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedUserModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "MovieIDs",
                type: "TEXT",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Username",
                table: "MovieIDs");
        }
    }
}
