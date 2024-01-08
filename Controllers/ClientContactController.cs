using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using YDCManagementApp.Data;
using YDCManagementApp.Models;

namespace YDCManagementApp.Controllers
{
    public class ClientContactController : Controller
    {
        private readonly YdcmanagementAppContext _context;
        private readonly ProjectsAndCustomerService _projectsAndCustomerService;

        public ClientContactController(YdcmanagementAppContext context, ProjectsAndCustomerService projectsAndCustomerService)
        {
            _context = context;
            _projectsAndCustomerService = projectsAndCustomerService;
        }

        // GET: ClientContact
        public async Task<IActionResult> Index()
        {
            var viewModel = await _projectsAndCustomerService.GetProjectsAndCustomersViewModel();
            return View(viewModel);
        }

        // GET: ClientContact/Details/5
        // This method retrieves the details of a specific client contact based on the provided ID.
        // It first checks if the ID is null and returns a NotFound result if it is.
        // It then attempts to find the client contact in the database using the provided ID.
        // If the client contact is not found, it returns a NotFound result.
        // If the client contact is found, it retrieves the associated client by using the ClientId property of the client contact.
        // If the client is not found, it returns a NotFound result.
        // If the client is found, it creates a new instance of the ProjectsAndCustomerViewModel class.
        // It adds the client and client contact to their respective lists in the view model.
        // Finally, it passes the view model to the View method to display the details in the associated view.
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            // Find the client contact by ID
            var clientContact = await _context.ClientContacts.FindAsync(id);

            if (clientContact == null)
            {
                return NotFound();
            }

            // Find the associated client by ClientId
            var client = await _context.Clients.FindAsync(clientContact.ClientId);

            if (client == null)
            {
                return NotFound();
            }
            
            // Find the associated client by ClientId
            var functions = await _context.Functions.FindAsync(clientContact.FunctionId);

            if (client == null)
            {
                return NotFound();
            }

            // Create a view model and populate it with the client and client contact
            var viewModel = new ProjectsAndCustomerViewModel
            {
                Clients = new List<Client> { client },
                ClientContacts = new List<ClientContact> { clientContact },
                Functions = new List<Functions> { functions }
            };

            return View(viewModel);
        }

        // GET: ClientContact/Create
        // Displays the form to create a new client contact
        public IActionResult Create()
        {
            CreateSelectLists(); // Prepare select lists for dropdowns or select elements on the view
            return View();
        }

        // POST: ClientContact/Create
        // Handles the form submission to create a new client contact
        // To protect from overposting attacks, only specific properties are bound for security purposes
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,ClientId,FirstName,Infix,LastName,Email,FunctionId,CallingCodeOffice,OfficePhoneNumber,CallingCodeMobile,MobileNumber")] ClientContact clientContact)
        {
            CreateSelectLists(); // Prepare select lists for dropdowns or select elements on the view

            if (ModelState.IsValid)
            {
                _context.Add(clientContact); // Add the new client contact to the context
                await _context.SaveChangesAsync(); // Save changes to the database
                return RedirectToAction(nameof(Index)); // Redirect to the index page after successful creation
            }

            return View(clientContact); // Return the view with the entered form values if there are validation errors
        }

        // GET: ClientContact/Edit/5
        // Displays the form to edit an existing client contact
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.ClientContacts == null)
            {
                return NotFound();
            }

            var clientContact = await _context.ClientContacts.FindAsync(id);
            if (clientContact == null)
            {
                return NotFound();
            }

            CreateSelectLists(); // Prepare select lists for dropdowns or select elements on the view

            return View(clientContact);
        }

        // POST: ClientContact/Edit/5
        // Handles the form submission to update an existing client contact
        // To protect from overposting attacks, only specific properties are bound for security purposes
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,ClientId,FirstName,Infix,LastName,Email,FunctionId,CallingCodeOffice,OfficePhoneNumber,CallingCodeMobile,MobileNumber")] ClientContact clientContact)
        {
            if (id != clientContact.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(clientContact); // Update the client contact in the context
                    await _context.SaveChangesAsync(); // Save changes to the database
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ClientContactExists(clientContact.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Details), new { id = clientContact.Id }); // Redirect to the details page of the updated client contact
            }

            CreateSelectLists(); // Prepare select lists for dropdowns or select elements on the view
            return View(clientContact); // Return the view with the entered form values if there are validation errors
        }

        // GET: ClientContact/Delete/5
        // Displays the confirmation page to delete a client contact
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.ClientContacts == null)
            {
                return NotFound();
            }

            var clientContact = await _context.ClientContacts
            .Include(c => c.Functions)
            .Include(c => c.Client)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (clientContact == null)
            {
                return NotFound();
            }

            return View(clientContact);
        }

        // POST: ClientContact/Delete/5
        // Handles the deletion of a client contact
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.ClientContacts == null)
            {
                return Problem("Entity set 'YdcmanagementAppContext.ClientContacts' is null.");
            }

            var clientContact = await _context.ClientContacts.FindAsync(id);
            if (clientContact != null)
            {
                clientContact.IsDeleted = true;
                _context.ClientContacts.Update(clientContact); // Remove the client contact from the context
            }

            await _context.SaveChangesAsync(); // Save changes to the database
            return RedirectToAction(nameof(Index)); // Redirect to the index page after successful deletion
        }

        // Checks if a client contact with the given id exists in the context
        private bool ClientContactExists(int id)
        {
            return (_context.ClientContacts?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        // Populates select lists for dropdowns or select elements on the view
        private void CreateSelectLists()
        {
            // Retrieve the list of clients from the context and create an anonymous object with properties ClientName and Id
            var clients = _context.Clients.Select(q => new
            {
                ClientName = $"{q.CompanyName}",
                q.Id
            });

            // Retrieve the list of Functions from the context and create an anonymous object with properties FunctionName and Id
            var functions = _context.Functions.Select(q => new
            {
                FunctionName = $"{q.FunctionName}",
                q.Id
            });

            // Store the select list in ViewData with key "Id" and set the data source to the clients list
            // Specify "Id" as the value field and "ClientName" as the text field
            ViewData["Id"] = new SelectList(clients, "Id", "ClientName");

            // Create a select list for the "Functions" dropdown
            ViewData["Functions"] = new SelectList(functions, "Id", "FunctionName");

        }

    }
}
