using System.Data.Entity.Migrations;
using System.Linq;

namespace PostsAPI.Models
{
    public class DbInitializer
    {
        public static void Initialize()
        {
            var configuration = new PostsDbContextConfiguration();
            var migrator = new DbMigrator(configuration);

            // Crear la migracion inicial si no existe
            if (!migrator.GetDatabaseMigrations().Any())
            {
                migrator.Update();
            }
        }
    }
}