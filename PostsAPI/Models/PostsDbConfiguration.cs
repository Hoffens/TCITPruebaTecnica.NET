using Npgsql;
using System.Data.Entity;


namespace PostsAPI.Models
{
    public class PostsDbConfiguration : DbConfiguration
    {
        public PostsDbConfiguration() 
        {
            SetProviderServices("Npgsql", NpgsqlServices.Instance);
            SetProviderFactory("Npgsql", NpgsqlFactory.Instance);
            SetDefaultConnectionFactory(new NpgsqlConnectionFactory());
        }
    }
}