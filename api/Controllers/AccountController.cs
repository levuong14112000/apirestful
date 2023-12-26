using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using api.DTO;
using api.Entities.Identity;
using api.Exceptions;
using api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        public AccountController(SignInManager<AppUser> signInManager, UserManager<AppUser> userManager, ITokenService tokenService)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _tokenService = tokenService;
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDto loginDto){
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null){
                return Unauthorized(new ErrorResponse(401));
            }
           var result = await _signInManager.CheckPasswordSignInAsync(user,loginDto.Password,false);
           if(!result.Succeeded){
                       return Unauthorized(new ErrorResponse(401));
           }
           return new UserDTO
           {
                Email = user.Email,
                DisplayName = user.DisplayName,
                Token = _tokenService.CreateToken(user)
           };
        }
           [HttpPost("register")]
           public async Task<ActionResult<UserDTO>> Register (RegisterDTO registerDTO)
           {
            var user = new AppUser
            {
                DisplayName = registerDTO.DisplayName,
                Email = registerDTO.Email,
                UserName = registerDTO.Email
            };
            var result = await _userManager.CreateAsync(user,registerDTO.Password);
            if (!result.Succeeded)
            return BadRequest(new ErrorResponse(400));
            return Ok(new UserDTO
            {
                DisplayName = user.DisplayName,
                Email = user.Email,
                Token = _tokenService.CreateToken(user)
            });
           }
           [Authorize] // phai co token moi truy xuat duoc
           [HttpGet]
           public async Task<ActionResult<UserDTO>> GetCurrentUser()
           {
               var email = HttpContext.User?.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
               var user = await _userManager.FindByEmailAsync(email);
               return new UserDTO
               {
                    Email = user.Email,
                    DisplayName = user.DisplayName,
                    Token = _tokenService.CreateToken(user)
               };
           }

        }
    }
