using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _token;
        public AccountController(DataContext context , ITokenService tokenService)
        {
               _context = context;
               _token = tokenService;
        }
        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register(RegisterDto register)
        {
            if(await UserExist(register.Username)) return BadRequest("UserName Already Taken");
            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                 UserName = register.Username.ToLower(),
                 PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(register.Password)),
                 PasswordSalt = hmac.Key
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login (LoginDto login)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == login.Username);
            if(user == null) return Unauthorized("Invalid UserName");
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computerHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(login.Password));
            for(int i =0 ; i < computerHash.Length; i++)
            {
                if(computerHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password"); 
            }
            return new UserDto
            {
               UserName = user.UserName,
               Token = _token.CreateToken(user)
            };
        }
        private async Task<bool> UserExist(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}