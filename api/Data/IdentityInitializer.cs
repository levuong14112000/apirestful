using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace api.Data
{
    public class IdentityInitializer
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager) {
            if (!userManager.Users.Any()) {
                var user = new AppUser 
                {
                    DisplayName = "Ray",
                    Email = "ray@email.com",
                    UserName = "ray@email.com",
                    Address = new Address
                    {
                        FirstName = "Ray",
                        LastName = "Le",
                        Street = "1111 NTMK, district 3",
                        City = "HCM",
                        State = "Viet Nam",
                        ZipCode = "70000"
                    }
                };
                await userManager.CreateAsync(user, "password");
            }
        }
    }
}