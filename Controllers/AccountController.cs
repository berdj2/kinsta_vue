using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Auth0.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using YDCManagementApp.Models;
using YDCManagementApp.Data;

namespace YDCManagementApp.Controllers;
public class AccountController : Controller
{
    private readonly YdcmanagementAppContext _context;

    public AccountController(YdcmanagementAppContext context)
    {
        _context = context;
    }

    public async Task Login(string returnUrl = "/")
    {
        var authenticationProperties = new LoginAuthenticationPropertiesBuilder()
            // Indicate here where Auth0 should redirect the user after a login.
            // Note that the resulting absolute Uri must be added to the
            // **Allowed Callback URLs** settings for the app.
            .WithRedirectUri(returnUrl)
            .Build();

        await HttpContext.ChallengeAsync(Auth0Constants.AuthenticationScheme, authenticationProperties);

    }

    [Authorize]
    public async Task Logout()
    {
        var authenticationProperties = new LogoutAuthenticationPropertiesBuilder()
            // Indicate here where Auth0 should redirect the user after a logout.
            // Note that the resulting absolute Uri must be added to the
            // **Allowed Logout URLs** settings for the app.
            .WithRedirectUri(Url.Action("Login", "Account"))
            .Build();

        await HttpContext.SignOutAsync(Auth0Constants.AuthenticationScheme, authenticationProperties);
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
    }

    [Authorize]
    public async Task<IActionResult> Profile()
    {
        // ViewData Profile page.    
        // from GetUserViewModelMethod.
        var userProfileViewModel = GetUserViewModel();

        // write Auth0 User to YDC database.
        await RegisterUser(userProfileViewModel);

        return View(userProfileViewModel);
    }

    public async Task RegisterUser(UserProfileViewModel userProfileViewModel)
    {
        // Create new User data to store in database
        // grabs name from Auth0 user viewModel
        // converts first letter of name and lastname + company to email.
        var user = new User
        {
            UserId = userProfileViewModel.UserId,
            FirstName = userProfileViewModel.Name?.Split(' ')[0],
            LastName = userProfileViewModel.Name?.Split(' ')[1],
            Email = $"{userProfileViewModel.Name?.FirstOrDefault().ToString().ToLower()}.{userProfileViewModel.Name?.Split(' ')[1].ToLower()}@yourdatcompany.com",
            LastLogin = DateTime.Now // Assuming you want to update the last login timestamp
        };

        // if user doesn't exist execute to add new data. 
        // else update last login timestamp.
        bool userExists = _context.Users.Any(c => c.Email == user.Email);

        if (!userExists)
        {
            _context.Users.Add(user);
        }

        // only update LastLogin Column if user does exist in database.
        else
        {
            var existingUser = _context.Users.Single(c => c.Email == user.Email);
            existingUser.LastLogin = DateTime.Now;
        }

        _context.SaveChanges();
    }

    // Models/UserViewModel.cs
    public UserProfileViewModel GetUserViewModel()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

        // ViewData Profile page.    
        var userProfileViewModel = new UserProfileViewModel
        {
            Name = $"{User.Identity.Name}",
            ProfileImage = User.Claims.FirstOrDefault(c => c.Type == "picture")?.Value,
            UserId = userIdClaim?.Value
        };

        return userProfileViewModel;
    }


}