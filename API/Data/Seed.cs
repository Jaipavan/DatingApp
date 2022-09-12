using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;
//using Newtonsoft.Json;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context)
        {
            if(await context.Users.AnyAsync()) return;
            var userData = await System.IO.File.ReadAllTextAsync("D:/Udamy/DatingApp/API/Data/UserSeedData1.json");
            
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
         //  var users = JsonConvert.DeserializeObject<List<AppUser>>(userData);
            foreach(var user in users)
            {
                using var hmac = new HMACSHA512();
                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd")); 
                user.PasswordSalt = hmac.Key;

                context.Users.Add(user);
                
            }

            await context.SaveChangesAsync();

        }
    }
}