using System.ComponentModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using YDCManagementApp.Data;
using YDCManagementApp.Models;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Net.Cache;
using Azure.Identity;
using Newtonsoft.Json;
using System.Configuration;
using Microsoft.CodeAnalysis.Options;
using Microsoft.Identity.Client.Platforms.Features.DesktopOs.Kerberos;

namespace YDCManagementApp.Controllers
{
public class ApiController : Controller 
{
    private readonly YdcmanagementAppContext _context;
    private readonly IConfiguration _configuration;

    public ApiController(YdcmanagementAppContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<Client> GetClientByIdAsync(int id)
    {
        // Query database using Dbcontect (_context variable) fetch client data based on id.
        // used in Api methods to pass in as arguments on parameters of Api calls.
        var client = await _context.Clients
            // include ClientContacts data
            // include Projects data
            // based on client id.
            .Include(c => c.ClientContacts)
            .Include(c => c.Projects)
            .FirstOrDefaultAsync(c => c.Id == id);

        return client;
    }

    public async Task HttpRequest(string apiUrl, string username, string password, object requestData)
    {
        using (HttpClient client = new HttpClient())
        {
            // Set up the basic authentication header
            string auth = Convert.ToBase64String(Encoding.ASCII.GetBytes($"{username}:{password}"));
            client.DefaultRequestHeaders.Add("Authorization", $"Basic {auth}");

            // Set up the content type header
            client.DefaultRequestHeaders.Add("ContentType", "application/json");

            // Convert the request data to JSON
            string requestBody = JsonConvert.SerializeObject(requestData);

            // Make the POST request
            HttpResponseMessage response = await client.PostAsync(apiUrl, new StringContent(requestBody, Encoding.UTF8, "application/json"));

            // Read the response
            string responseBody = await response.Content.ReadAsStringAsync();

            // Display the response
            Console.WriteLine($"Response: {response.StatusCode}\n{responseBody}");
        }
    }


    // Api method section.
    // Each Platform has it's own api method block for readability
    // and maintainability. 
    // store re-occuring standalone methods (like get client name) 
    // above this section and call them 
    // based on method names. 

    public async Task<IActionResult> ConfluenceApi(int id)
    {
        var client = await GetClientByIdAsync(id);
        string apiUrl = "https://yourdatacompany.atlassian.net/wiki/rest/api/space";
        
        string userName = _configuration.GetValue<string>("AtlassianCredentials:userName");
        string passWord = _configuration.GetValue<string>("AtlassianCredentials:passWord");

        if (client == null)
        {
            return NotFound();
        }

        ConfluenceApiModel confluenceApiModel = new ConfluenceApiModel
        {
            key = client.CompanyName.Substring(0, 3).ToUpper(),
            name = client.CompanyName, 

            plains = new List<Plain>
            {
                new Plain 
                {
                    value = $"Welcome on the page for further information about projects contact: {Environment.NewLine}" +
                            $"Company: {client.CompanyName}{Environment.NewLine}" +
                            $"Contact: {client.ClientContacts.FirstOrDefault()?.FirstName} {client.ClientContacts.FirstOrDefault()?.LastName}",
                    
                    representation = ""
                }
            }
        };

        await HttpRequest(apiUrl, userName, passWord, confluenceApiModel);

        return Content("");
    }

    public async Task<IActionResult> JiraApi(int id)
    {
        var client = await GetClientByIdAsync(id);

        string apiUrl = "https://yourdatacompany.atlassian.net/rest/api/3/project";

        if (client == null)
        {
            return NotFound();
        }

        return View(client);
    }

    public async Task<IActionResult> SharepointApi(int id)
    {
        var client = await GetClientByIdAsync(id);

        if (client == null)
        {
            return NotFound();
        }

        return View(client);
    }
}

}
