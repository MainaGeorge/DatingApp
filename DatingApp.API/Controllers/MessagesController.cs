using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Helpers;
using DatingApp.API.Migrations;
using DatingApp.API.Models;
using DatingApp.API.Models.DataTransferObjects;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Route("api/users/{userId}/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IDatingRepository _repo;

        public MessagesController(IMapper mapper, IDatingRepository repo)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("{messageId}", Name = "GetMessage")]
        public async Task<IActionResult> GetMessage(int userId, int messageId)
        {
            var loggedUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if (loggedUserId != userId)
            {
                return Unauthorized();
            }

            var messageFromRepo = await _repo.GetMessage(messageId);

            if (messageFromRepo == null)
            {
                return NotFound();
            }

            return Ok(messageFromRepo);
        }

        [HttpPost]
        public async Task<IActionResult> PostMessage(int userId, MessageToSend message)
        {
            var loggedUser = await _repo.GetUser(userId);
            var loggedUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (loggedUserId != loggedUser.Id)
            {
                return Unauthorized();
            }

            var recipient = await _repo.GetUser(message.RecipientId);
            if (recipient == null)
            {
                return BadRequest("couldn't find the recipient");
            }

            message.SenderId = userId;

            var messageToSave = _mapper.Map<Message>(message);

            _repo.Add(messageToSave);

            if (!await _repo.SaveAll()) throw new Exception("sending message failed on save");

            var messageToReturn = _mapper.Map<MessageToReturnDto>(messageToSave);

            // return CreatedAtRoute("GetMessage", new { messageId = messageToSave.Id }, messageToReturn);
            return CreatedAtAction("GetMessage", new { userId, messageId = messageToSave.Id }, messageToReturn);
        }

        [HttpGet]
        public async Task<IActionResult> GetMessages(int userId,
            [FromQuery] MessagesQueryParameters messagesParams)
        {
            var loggedUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if (loggedUserId != userId)
            {
                return Unauthorized();
            }

            messagesParams.UserId = userId;

            var messagesFromRepo = await _repo.GetMessagesForUser(messagesParams);

            var messages = _mapper.Map<IEnumerable<MessageToReturnDto>>(messagesFromRepo);

            Response.AddPagination(messagesFromRepo.PageNumber, messagesFromRepo.PageSize,
                messagesFromRepo.TotalCount, messagesFromRepo.TotalPages);

            return Ok(messages);
        }

        [HttpGet("thread/{recipientId}")]
        public async Task<IActionResult> GetMessageThread(int userId, int recipientId)
        {
            var loggedUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var loggedUser = await _repo.GetUser(loggedUserId);

            if (loggedUser.Id != userId)
            {
                return Unauthorized();
            }

            var recipient = await _repo.GetUser(recipientId);
            if (recipient == null)
            {
                return NotFound("couldn't find user");
            }

            var messagesFromRepo = await _repo.GetMessageThread(userId, recipientId);

            var messagesToReturn = _mapper.Map<IEnumerable<MessageToReturnDto>>(messagesFromRepo);

            return Ok(messagesToReturn);
        }
    }
}
