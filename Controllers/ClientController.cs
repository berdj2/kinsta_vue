using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspNetCoreHero.ToastNotification.Abstractions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using YDCManagementApp.Data;
using YDCManagementApp.Models;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace YDCManagementApp.Controllers
{
    public class ClientController : Controller
    {
        private readonly YdcmanagementAppContext _context;
        private readonly INotyfService _notyfService;
        private readonly ProjectsAndCustomerService _projectsAndCustomerService;

        public ClientController(YdcmanagementAppContext context, INotyfService notyfService, ProjectsAndCustomerService projectsAndCustomerService)
        {
            _context = context;
            this._notyfService = notyfService;
            _projectsAndCustomerService = projectsAndCustomerService;
        }

        // Retrieves the ViewModel containing projects and customer data for the index page.
        // GET: Project
        public async Task<IActionResult> Index()
        {
            // Get the ViewModel for the index page
            var viewModel = await _projectsAndCustomerService.GetProjectsAndCustomersViewModel();

            // Return the index view with the ViewModel
            return View(viewModel);
        }

        // Retrieves and displays the details of a specific project.
        // GET: Project/Details/{id}
        public async Task<IActionResult> Details(int? id)
        {
            // Check if the id parameter is not provided
            if (id == null)
            {
                return NotFound(); // or handle the case when the id is not provided
            }

            // Retrieve the customer with the specified id from the database
            var customer = await _context.Clients
                .Where(m => m.Id == id)
                .ToListAsync();

            // Retrieve the projects associated with the customer
            var projects = await _context.Projects
                .Where(p => p.ClientId == id)
                .ToListAsync();

            // Retrieve the client contacts associated with the customer
            var clientContacts = await _context.ClientContacts
                .Where(t => t.ClientId == id)
                .ToListAsync();

            // Retrieve the client info associated with the customer
            var adresses = await _context.ClientInfo
                .Where(t => t.ClientId == id)
                .ToListAsync();

            // Check if the customer is not found
            if (customer == null)
            {
                return NotFound(); // or handle the case when the customer is not found
            }

            // Create a ViewModel to hold the customer details, projects, and client contacts
            var viewModel = new ProjectsAndCustomerViewModel
            {
                Clients = customer,
                Projects = projects,
                ClientContacts = clientContacts,
                ClientInfo = adresses
            };

            // Pass the ViewModel to the view for rendering the details
            return View(viewModel);
        }

        // Displays the view for creating a new client.
        // GET: Client/Create
        public IActionResult Create()
        {
            MultipleViewModel multimodelview = new();
            return View(multimodelview);
        }

        // Creates a new client based on the provided form data.
        // POST: Client/Create
        // To protect from overposting attacks, only bind specific properties to the model.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("CompanyName,Website,ClientStatus")] Client client, [Bind("Street,ZipCode,State,City,Country,AddressNum")] ClientInfo clientInfo)
        {
            // Check if the company name already exists in the database
            bool companyNameExists = _context.Clients.Any(c => c.CompanyName == client.CompanyName);

            // MultipleViewModel multimodelview = new();
            
            if (companyNameExists)
            {
                ModelState.AddModelError("Client.CompanyName", "The company name already exists.");
            }


            // Validate if the provided client data is valid based on the model's validation attributes
            if (ModelState.IsValid)
            {
                // Add the client to the context and save changes to the database
                _context.Add(client);
                await _context.SaveChangesAsync();

                // After saving, retrieve the client's Id
                int clientId = client.Id;

                // Associate the clientInfo with the newly created client
                clientInfo.ClientId = clientId;

                // Add clientInfo to the context and save changes
                _context.ClientInfo.Add(clientInfo);
                await _context.SaveChangesAsync();

                // Redirect to the Index action method to display the updated client list
                return RedirectToAction("Index", "Client");
            }

            // If the provided client data is invalid, return the view with the entered data
            return View();
        }

        // GET: Client/Edit/5
        public async Task<IActionResult> Edit(int id)
        {
            var client = await _context.Clients.FindAsync(id);
            if (client == null)
            {
                return NotFound();
            }

            return View(client);
        }

        // Updates the client with the provided form data.
        // POST: Client/Edit/5
        // To protect from overposting attacks, only bind specific properties to the model.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,CompanyName,Website,ClientStatus")] Client client)
        {
            if (id != client.Id)
            {
                return NotFound();
            }

            // Validate if the provided client data is valid based on the model's validation attributes
            if (ModelState.IsValid)
            {
                try
                {
                    // Update the client in the context and save changes to the database
                    _context.Update(client);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ClientExists(client.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                // Redirect to the Details action method to display the updated client details
                return RedirectToAction(nameof(Details), new { id = client.Id });
            }

            // If the provided client data is invalid, return the view with the entered data
            return View(client);
        }

        // Displays the view for deleting a client.
        // GET: Client/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            // Retrieve the client from the context, including its associated client contacts, projects and clientinfo
            var client = await _context.Clients
                .Include(c => c.ClientContacts)
                .Include(c => c.Projects)
                .Include(c => c.ClientInfo)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (client == null)
            {
                return NotFound();
            }

            // Check if the client has any associated client contacts or projects
            if (client.ClientContacts.Count > 0 || client.Projects.Count > 0 || client.ClientInfo.Count > 0)
            {
                // Display a warning message using the notification service
                _notyfService.Warning("Cannot delete the client because it has associated contacts or projects.");
                return View(client);
            }

            return View(client);
        }

        // Handles the submission of the create form for a new client.
        // client: The client object containing the form data.
        // POST: Client/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var client = await _context.Clients
                .Include(c => c.ClientContacts)
                .Include(c => c.Projects)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (client == null)
            {
                return NotFound();
            }

            if (client.ClientContacts.Count > 0 || client.Projects.Count > 0)
            {
                _notyfService.Warning("Cannot delete the client because it has associated contacts or projects.");
                return View(client); // Return the same view with client information
            }

            _context.Clients.Remove(client);
            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }

        // Checks if a client with the specified ID exists in the database.
        // id: The ID of the client.
        // Returns: true if the client exists; otherwise, false.
        private bool ClientExists(int id)
        {
            return (_context.Clients?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
