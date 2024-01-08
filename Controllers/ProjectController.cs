using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Auth0.ManagementApi.Clients;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using YDCManagementApp.Data;
using YDCManagementApp.Models;
using System.Security.Claims;

namespace YDCManagementApp.Controllers
{
public class ProjectController : Controller
{
    private readonly YdcmanagementAppContext _context;
    private readonly ProjectsAndCustomerService _projectsAndCustomerService;

    public ProjectController(YdcmanagementAppContext context, ProjectsAndCustomerService projectsAndCustomerService)
    {
        _context = context;
        _projectsAndCustomerService = projectsAndCustomerService;
    }

        // GET: Project
        // Taking the ProjectsAndCustomerViewModel for data display on this index method.
        public async Task<IActionResult> Index()
        {
            var viewModel = await _projectsAndCustomerService.GetProjectsAndCustomersViewModel();
            return View(viewModel);
        }
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var project = await _context.Projects
                .Include(p => p.Expertise)
                .FirstOrDefaultAsync(p => p.Id == id);
                
            if (project == null)
            {
                return NotFound();
            }

              var client = await _context.Clients
                .Include(c => c.ClientContacts)
                .FirstOrDefaultAsync(c => c.Id == project.ClientId);
            if (client == null)
            {
                return NotFound();
            }

            var contact = client.ClientContacts.FirstOrDefault(); // Retrieve a contact associated with the client as needed

            var projectHoursLogs = await _context.ProjectHoursLogs
                .Where(phl => phl.ProjectId == id)
                .Include(phl => phl.User)
                .ToListAsync();

            var users = _context.Users.ToList(); // Load all users

            User selectedUser = new User
            {
                UserId = User.FindFirst(ClaimTypes.NameIdentifier).Value
            };

            var hoursLogModel = new HoursLogModel
            {
                 SelectedProject = project,
                SelectedUser = selectedUser,
                ProjectHoursLogsList = projectHoursLogs,
                UsersList = users,
                ProjectsList = new List<Project> { project } // Initialize with a list containing the selected project
            };

            return View(hoursLogModel);
        }



        // GET: Project/Create
        public IActionResult Create()
        {
            CreateSelectLists();
            return View();
        }

        // POST: Project/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,ClientId,ContactId,ExpertiseId,ProjectName,ProjectDescription,ProjectDeadline,ProjectStatus")] Project project, int ClientId)
        {
            if (ModelState.IsValid)
            {
                // Assign the selected ClientId
                project.ClientId = ClientId;

                _context.Add(project);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Details), new { id = project.Id });
            }

            CreateSelectLists();
            return View(project);
        }

        // GET: Project/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            ViewBag.ClientId = new SelectList(_context.Clients, "Id", "CompanyName", project.ClientId);
            ViewBag.ContactId = new SelectList(_context.ClientContacts.Where(c => c.ClientId == project.ClientId), "Id", "ContactName", project.ContactId);
            ViewBag.ExpertiseId = new SelectList(_context.Expertises, "Id", "ExpertiseName", project.ExpertiseId);


            CreateSelectLists();

            return View(project);
        }


        // POST: Project/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,ClientId,ContactId,ExpertiseId,ProjectName,ProjectDescription,ProjectDeadline,ProjectStatus")] Project project, int ClientId)
        {
            if (id != project.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    // Assign the selected ClientId
                    project.ClientId = ClientId;

                    _context.Update(project);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ProjectExists(project.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Details), new { id = project.Id }); 
            }

            CreateSelectLists();
            return View(project);
        }

        // GET: Project/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Projects == null)
            {
                return NotFound();
            }

            var project = await _context.Projects
                .FirstOrDefaultAsync(m => m.Id == id);
            if (project == null)
            {
                return NotFound();
            }

            return View(project);
        }

        // POST: Project/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            var userIdClaim =  User.FindFirst(ClaimTypes.NameIdentifier);

            // Assuming IsDeleted is a property in your Project model
            project.IsDeleted = true; // Set IsDeleted to 1

            var archivedProject = new ArchivedProjects
            {   
                Id = project.Id,
                ClientId = project.ClientId,
                ContactId = project.ContactId,
                ExpertiseId = project.ExpertiseId,
                UserId = userIdClaim?.Value,
                DeletedAt = DateTime.Now 
            };

            _context.ArchivedProjects.Add(archivedProject);
            await _context.SaveChangesAsync();
            
            return RedirectToAction(nameof(Index));
        }

        private bool ProjectExists(int id)
        {
          return (_context.Projects?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        // Private method for object relational mapping.
        // assign company and assisting contact to a new project.
        private void CreateSelectLists()
        {

            // Select list for which company the project is for.
            // assignes ClientId to the Project table ClientId column.
            // Id in project table equals the standalone project to route to details pages.
            var clients = _context.Clients.Select(q => new
            {
                ClientName = $"{q.CompanyName}",
                Id = q.Id
            });
            ViewData["CompanyId"] = new SelectList(clients, "Id", "ClientName");

            // Select Contact after company. 
            // assigns select list of contacts based on the Id of client table.
            // only contacts of that company appear in select list.
            var contacts = _context.ClientContacts.Select(q => new
            {
                ContactName = $"{q.FirstName} {q.LastName}",
                Id = q.Id
            });
            ViewData["ContactId"] = new SelectList(contacts, "Id", "ContactName");

            var expertises = _context.Expertises.Select(q => new
            {
                ExpertiseName = $"{q.Name}",
                Id = q.Id
            });
            ViewData["ExpertiseId"] = new SelectList(expertises, "Id", "ExpertiseName");
        }

        // Action method for retrieving contacts based on the selected clientId.
        // Parameters:
        //   clientId: The selected clientId.
        // Returns:
        //   A JSON result containing the contacts.
        public IActionResult GetContactsByClientId(int clientId)
        {
            // Retrieve the contacts from the database based on the selected clientId.
            var contacts = _context.ClientContacts
                .Where(cc => cc.ClientId == clientId)
                .Select(cc => new
                {
                    value = cc.Id, // Value of the option element in the dropdown.
                    text = $"{cc.FirstName} {cc.LastName}" // Text displayed in the dropdown.
                })
                .ToList();

            // Return the contacts as a JSON result.
            return Json(contacts);
        }
    }
}
