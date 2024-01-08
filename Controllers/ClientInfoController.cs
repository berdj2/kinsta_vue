using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using YDCManagementApp.Data;
using YDCManagementApp.Models;
using YDCManagementApp.Controllers;
using Microsoft.AspNetCore.Mvc.TagHelpers;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace YDCManagementApp.Controllers
{
    public class ClientInfoController : Controller
    {
        // entity context variable.
        private readonly YdcmanagementAppContext _context;

        public ClientInfoController(YdcmanagementAppContext context)
        {
            _context = context;
        }

        // GET: ClientInfo
        // return the clientinfo index of all clients info in a list.
        public async Task<IActionResult> Index()
        {
            // get all the data related to the clientinfo.
            var customerManagementAppContext = _context.ClientInfo.Include(c => c.Client);
            // return the view with a list of the data.
            return View(await customerManagementAppContext.ToListAsync());
        }

        // GET: ClientInfo/Details/5
        // return a details view of the current clientinfo.
        public async Task<IActionResult> Details(int? id)
        {
            // checks the related id with the clientinfo if not match return not found error.
            if (id == null || _context.ClientInfo == null)
            {
                return NotFound();
            }

            // get clientinfo data that is related to the given client id.
            var clientInfo = await _context.ClientInfo
                .Include(c => c.Client)
                .FirstOrDefaultAsync(m => m.Id == id);

            // if clientinfo is null return an error.
            if (clientInfo == null)
            {
                return NotFound();
            }

            // if all is wel return view with data.
            return View(clientInfo);
        }

        // GET: ClientInfo/Create
        // create a new record of clientinfo
        public IActionResult Create(int Id)
        {
            // create a list of data with the clientinfo that is related to the given client id.
            ViewData["ClientName"] = new SelectList(_context.Set<Client>(), "Id", "CompanyName");

            // return client collection based on given id
            var client = _context.Clients.FirstOrDefault(c => c.Id == Id);

            // create a new viewmodel and pass data to it
            var model = new MultipleViewModel
            {
                // Set the ClientId property in your model
                clientInfo = new ClientInfo
                {
                    ClientId = client.Id // Set to the selected Id, or null if not found
                },
                Client = client
            };

            // return view with new model and data
            return View(model);
        }

        // POST: ClientInfo/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        // add a new clientinfo record
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ClientId,Street,ZipCode,State,City,Country,AddressNum")] ClientInfo clientInfo)
        {
            // if the model data is valid run code.
            if (ModelState.IsValid)
            {
                // create the given data in the database.
                _context.Add(clientInfo);
                // wait for the data to be created.
                await _context.SaveChangesAsync();

                // Retrieve the ID of the last created ClientInfo record
                var lastClientInfoId = clientInfo.Id;

                // return to the details page of the last created clientInfo
                return RedirectToAction(nameof(Details), new { id = lastClientInfoId });
            }

            // create a list to give to the view for selecting.
            ViewData["ClientId"] = new SelectList(_context.Set<Client>(), "Id", "CompanyName", clientInfo.ClientId);

            // return view with data 
            return View(clientInfo);
        }

        // GET: ClientInfo/Edit/5
        // edit a current clientinfo.
        public async Task<IActionResult> Edit(int? id)
        {
            // checks if the id is null or not if yes return error.
            if (id == null || _context.ClientInfo == null)
            {
                return NotFound();
            }

            // return a clientinfo collection based on given id.
            var clientInfo = await _context.ClientInfo.FindAsync(id);

            // if clientinfo collection is null return error.
            if (clientInfo == null)
            {
                return NotFound();
            }

            // return a select list with clientinfo context data based on given id.
            ViewData["ClientId"] = new SelectList(_context.Set<Client>(), "Id", "CompanyName", clientInfo.ClientId);

            // return view with clientinfo data.
            return View(clientInfo);
        }

        // POST: ClientInfo/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        // edit clieninfo data of the current adress
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,ClientId,Street,ZipCode,State,City,Country,AddressNum")] ClientInfo clientInfo)
        {
            // checks if id matches the id of the clientinfo id, if not return error
            if (id != clientInfo.Id)
            {
                return NotFound();
            }

            // checks if view model data is valid
            if (ModelState.IsValid)
            {
                // update the clieninfo 
                try
                {
                    _context.Update(clientInfo);
                    await _context.SaveChangesAsync();
                }
                // if for somereason the clientinfo was not updated return error
                catch (DbUpdateConcurrencyException)
                {
                    if (!ClientInfoExists(clientInfo.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                // reedirect to clientinfo details page
                return RedirectToAction(nameof(Details), new { id = clientInfo.Id });
            }
            // return a list with clientinfo data 
            ViewData["ClientId"] = new SelectList(_context.Set<Client>(), "Id", "AddressNum", clientInfo.ClientId);
            // return a view with client info data
            return View(clientInfo);
        }

        // GET: ClientInfo/Delete/5
        // return a record based on given id
        public async Task<IActionResult> Delete(int? id)
        {
            // checks if given id is null or not
            if (id == null || _context.ClientInfo == null)
            {
                return NotFound();
            }

            // return clientinfo data based on given id 
            var clientInfo = await _context.ClientInfo
                .Include(c => c.Client)
                .FirstOrDefaultAsync(m => m.Id == id);
            // if clientinfo data is null return error 
            if (clientInfo == null)
            {
                return NotFound();
            }

            // return view with clientinfo data 
            return View(clientInfo);
        }

        // POST: ClientInfo/Delete/5
        // delete a record based on given id
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            // if clieninfo context is null return an error
            if (_context.ClientInfo == null)
            {
                return Problem("Entity set 'CustomerManagementAppContext.ClientInfo'  is null.");
            }

            // get clieninfo record based on id
            var clientInfo = await _context.ClientInfo.FindAsync(id);
            // if clientinfo data is not null delete this record
            if (clientInfo != null)
            {
                _context.ClientInfo.Remove(clientInfo);
            }

            // wait for changes
            await _context.SaveChangesAsync();

            // Retrieve the associated client's ID before redirecting
            int clientId = clientInfo.ClientId;

            // Redirect to the Details action of the Client controller with the clientId parameter
            return RedirectToAction("Details", "Client", new { id = clientId });
        }

        // checks if a client exist in the database. return true or false.
        private bool ClientInfoExists(int id)
        {
            return (_context.ClientInfo?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
