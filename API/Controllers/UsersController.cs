
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Interface;
using API.DTOs;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
   //[Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
      public  UsersController (IUserRepository userRepository , IMapper mapper)
      {
        _userRepository = userRepository;
        _mapper = mapper;
      }

      [HttpGet]
      public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
      {
         var users = await _userRepository.GetMemberAsync();
        // var userDaztails = _mapper.Map<IEnumerable<MemberDto>>(users);
         return Ok(users);
      }

      [HttpGet("{username}")]
      public async Task<ActionResult<MemberDto>> GetUser(string username)
      {
        var users = await _userRepository.GetMember(username);
       // var profileDetails = _mapper.Map<MemberDto>(users);
        return Ok(users);
      }
    }
}