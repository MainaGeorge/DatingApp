﻿using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.API.Data;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using DatingApp.API.Models.DataTransferObjects;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IDatingRepository _repo;
        private readonly Cloudinary _cloudinary;

        public PhotosController(IOptions<CloudinarySettings> cloudinarySettings,
            IMapper mapper, IDatingRepository repo)
        {
            var cloudinarySettings1 = cloudinarySettings;
            _mapper = mapper;
            _repo = repo;

            var account = new Account(cloudinarySettings.Value.CloudName,
                cloudinarySettings1.Value.ApiKey,
                cloudinarySettings1.Value.ApiSecret);

            _cloudinary = new Cloudinary(account);

        }

        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _repo.GetPhoto(id);
            var photo = _mapper.Map<PhotoToReturnDto>(photoFromRepo);

            return Ok(photo);
        }


        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId,
            [FromForm] PhotoForCreationDto photoForCreationDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(userId);

            if (photoForCreationDto.File != null)
            {
                var file = photoForCreationDto.File;

                var uploadResult = new ImageUploadResult();


                await using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(file.Name, stream),
                    Transformation = new Transformation()
                        .Width(500).Height(500).Crop("fill").Gravity("face")
                };

                uploadResult = _cloudinary.Upload(uploadParams);

                photoForCreationDto.Url = uploadResult.Url.ToString();
                photoForCreationDto.PublicId = uploadResult.PublicId;

                var photo = _mapper.Map<Photo>(photoForCreationDto);

                if (!userFromRepo.Photos.Any(u => u.IsMain))
                    photo.IsMain = true;

                userFromRepo.Photos.Add(photo);

                if (!await _repo.SaveAll()) return BadRequest("Could not add the photo");


                var photoToReturn = _mapper.Map<PhotoToReturnDto>(photo);
                return CreatedAtAction("GetPhoto", new { id = photo.Id }, photoToReturn);
                // return Ok(photoToReturn);


            }
            else
            {
                return BadRequest("Please select a photo to upload");
            }


        }

        [HttpPost("{photoId}/setMainPhoto")]
        public async Task<IActionResult> SetMainPhoto(int userId, int photoId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _repo.GetUser(userId);

            if (user.Photos.All(p => p.Id != photoId))
            {
                return Unauthorized();
            }

            var photoFromRepo = await _repo.GetPhoto(photoId);
            if (photoFromRepo.IsMain)
            {
                return BadRequest("This is already the main photo");
            }

            var currentMainPhoto = await _repo.GetMainPhotoForUser(userId);
            if (currentMainPhoto != null)
            {
                currentMainPhoto.IsMain = false;
                photoFromRepo.IsMain = true;
            }

            if (await _repo.SaveAll())
            {
                return NoContent();
            }

            return BadRequest("Failed to set the photo as the main photo");
        }

        [HttpDelete("{photoId}")]
        public async Task<IActionResult> DeletePhoto(int userId, int photoId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _repo.GetUser(userId);

            if (user.Photos.All(p => p.Id != photoId))
            {
                return Unauthorized();
            }

            var photoFromRepo = await _repo.GetPhoto(photoId);

            if (photoFromRepo.IsMain)
            {
                return BadRequest("You can not delete your main profile photo");
            }

            if (photoFromRepo.PublicId == null) //delete photos from the repo
            {
                _repo.Delete(photoFromRepo);
            }
            else // photo from cloudinary
            {
                var deletionParameters = new DeletionParams(photoFromRepo.PublicId);

                var result = await _cloudinary.DestroyAsync(deletionParameters);

                if (result.Result == "ok")
                {
                    _repo.Delete(photoFromRepo);
                }
            }

            if (await _repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Unable to delete photo");
        }
    }
}
