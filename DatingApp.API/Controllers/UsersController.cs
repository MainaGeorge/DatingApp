using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using DatingApp.API.Models.DataTransferObjects;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;

        public UsersController(IDatingRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }


        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery] QueryParameters queryParameters)
        {

            var loggedInUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            queryParameters.UserId = loggedInUserId;

            var loggedInUser = await _repo.GetUser(loggedInUserId);

            if (string.IsNullOrWhiteSpace(queryParameters.Gender))
                queryParameters.Gender = loggedInUser.Gender == "male" ? "female" : "male";




            var users = await _repo.GetUsers(queryParameters);

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDataObject>>(users);

            Response.AddPagination(users.PageNumber, users.PageSize, users.TotalCount, users.TotalPages);


            return Ok(usersToReturn);
        }

        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);

            var userToReturn = _mapper.Map<UserForDetailedViewDataObject>(user);
            return Ok(userToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UpdateProfileDataObject updatedUserProfile)
        {
            var loggedInUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if (id != loggedInUserId)
            {
                return Unauthorized();
            }

            var userProfileFromDb = await _repo.GetUser(id);

            _mapper.Map(source: updatedUserProfile, destination: userProfileFromDb);

            if (await _repo.SaveAll())
            {
                return NoContent();
            }

            throw new Exception($"updating user {id} failed on save");

        }

        [HttpPost("{userId}/likes/{likeeId}")]
        public async Task<IActionResult> LikeUser(int userId, int likeeId)
        {
            var loggedInUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (userId != loggedInUserId)
            {
                return Unauthorized();
            }

            var userToBeLiked = await _repo.GetUser(likeeId);

            if (userToBeLiked == null)
            {
                return NotFound("The user does not exist");
            }

            var like = await _repo.GetLike(userId, likeeId);

            if (like != null)
            {
                return BadRequest("You already like this user");
            }

            like = new Like()
            {
                LikerId = userId,
                LikeeId = likeeId
            };

            _repo.Add<Like>(like);

            if (await _repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("failed to like user");

        }
    }
}
