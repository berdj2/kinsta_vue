using YDCManagementApp.Data;
using YDCManagementApp.Models;
using Microsoft.EntityFrameworkCore;

// Service class in a separate file, e.g., ProjectsAndCustomerService.cs
public class ProjectsAndCustomerService
{
    private readonly YdcmanagementAppContext _context;

    public ProjectsAndCustomerService(YdcmanagementAppContext context)
    {
        _context = context;
    }

    public async Task<ProjectsAndCustomerViewModel> GetProjectsAndCustomersViewModel()
    {
        var project = await _context.Projects.ToListAsync();
        var client = await _context.Clients.ToListAsync();
        var clientContact = await _context.ClientContacts.ToListAsync();
        var functions = await _context.Functions.ToListAsync();
        var clientInfo = await _context.ClientInfo.ToListAsync();
        var expertise = await _context.Expertises.ToListAsync();
        var user = await _context.Users.ToListAsync();
        var projectHoursLog = await _context.ProjectHoursLogs.ToListAsync();

        return new ProjectsAndCustomerViewModel
        {
            Projects = project,
            Clients = client,
            ClientContacts = clientContact,
            Functions = functions,
            ClientInfo = clientInfo,
            Expertises = expertise,
            Users = user,
            ProjectHoursLogs = projectHoursLog
        };
    }
}