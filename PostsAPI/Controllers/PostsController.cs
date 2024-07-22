using PostsAPI.Models;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace PostsAPI.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class PostsController : ApiController
    {
        private PostsDbContext _db = new PostsDbContext();

        public HttpResponseMessage Get()
        {
            try
            {
                var posts = _db.Posts.ToList();

                if (!posts.Any())
                {
                    return Request.CreateResponse(HttpStatusCode.NoContent);
                }

                return Request.CreateResponse(HttpStatusCode.OK, posts);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error inesperado: {ex.Message}");
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }

        [HttpPost]
        public HttpResponseMessage Post(PostDto newPost)
        {
            try
            {   
                if (newPost is null || string.IsNullOrEmpty(newPost.Name) || string.IsNullOrWhiteSpace(newPost.Name))
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest);
                }

                Posts post = new Posts()
                {
                    Name = newPost.Name,
                    Description = newPost.Description
                };

                var result = _db.Posts.Add(post);
                _db.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.Created, result);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error inesperado: {ex.Message}");
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }

        [HttpDelete]
        public HttpResponseMessage Delete(int id) 
        { 
            try
            {
                var postToDelete = _db.Posts.Where(post => post.Id == id).FirstOrDefault();

                if (postToDelete is null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                _db.Posts.Remove(postToDelete);
                _db.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK, postToDelete);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error inesperado: {ex.Message}");
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }
    }
}
