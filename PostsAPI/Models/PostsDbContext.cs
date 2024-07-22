using System.Data.Entity;

namespace PostsAPI.Models
{
    [DbConfigurationType(typeof(PostsDbConfiguration))]
    public class PostsDbContext : DbContext
    {
        public PostsDbContext() : base("name=PostsDbContext") 
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<PostsDbContext, PostsDbContextConfiguration>());
        }

        public DbSet<Posts> Posts { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //modelBuilder.HasDefaultSchema("public");
            base.OnModelCreating(modelBuilder);
        }
    }
}