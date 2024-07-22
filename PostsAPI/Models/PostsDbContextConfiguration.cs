using System.Data.Entity.Migrations;

namespace PostsAPI.Models
{
    public class PostsDbContextConfiguration : DbMigrationsConfiguration<PostsDbContext>
    {
        public PostsDbContextConfiguration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }
    }
}