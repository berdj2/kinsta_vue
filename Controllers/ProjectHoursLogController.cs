using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspNetCoreHero.ToastNotification.Abstractions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using YDCManagementApp.Data;
using YDCManagementApp.Models;
using System.Security.Claims;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Logging;
using System.Text.RegularExpressions;

namespace YDCManagementApp.Controllers
{
    [Authorize]
    public class ProjectHoursLogsController : Controller
    {
        private readonly YdcmanagementAppContext _context;
        private readonly INotyfService _notyfService; // add a notify service variable
        private readonly ILogger<ProjectHoursLogsController> _logger; // add log services

        public ProjectHoursLogsController(YdcmanagementAppContext context, INotyfService notyfService, ILogger<ProjectHoursLogsController> logger)
        {
            _context = context;
            _notyfService = notyfService; // add notify to context
            _logger = logger; // add logger
        }

        // POST: Project/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,UserId,ProjectId,DateStartTime,DateEndTime,DateTimeDiff")] ProjectHoursLog projectHoursLogs)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (projectHoursLogs == null) {
                        _notyfService.Error("Something whent wrong!!",5);
                        return RedirectToAction("Index", "Project");
                    }

                    // checks if projectid is null if yes return to index and give a error message.
                    if (projectHoursLogs.ProjectId == null) {
                        _notyfService.Error("Something whent wrong!!",5);
                        return RedirectToAction("Index", "Project");
                    }

                    // Validate the DateTimeDiff field
                    string dateTimeDiff = projectHoursLogs.DateTimeDiff;
                    string validationResult = ValidateTime(dateTimeDiff);
                    if (validationResult != dateTimeDiff)
                    {
                        _notyfService.Warning(validationResult, 5);
                        return RedirectToAction("Details", "Project", new { Id = projectHoursLogs.ProjectId }); // Redirect to the Details action with the projectId
                    }

                    // add the context values to the projecthourslogs entity
                    _context.ProjectHoursLogs.Add(projectHoursLogs);

                    // insert object into database
                    await _context.SaveChangesAsync();

                    _notyfService.Success("Time Succesfully created",5);
                    // Redirect to the Details action with the projectId
                    return RedirectToAction("Details", "Project", new { id = projectHoursLogs.ProjectId });
                }
                else
                {
                    // Add a model state error message
                    ModelState.AddModelError(string.Empty, "Time or Date doesn't exist!!");

                    // Use _notyfService to give a error message
                    _notyfService.Error("Time or Date doesn't exist!!",5);

                    // Redirect to the Details action with the projectId
                    return RedirectToAction("Details", "Project", new { id = projectHoursLogs.ProjectId });
                }
            }
            catch (Exception ex)
            {
                // For example, you can log the exception and display a user-friendly error message.
                _logger.LogError(ex, "An error occurred while processing the Create action.");

                // give warning
                _notyfService.Warning("Something whent wrong!!",5);

                // Redirect to an error page or take other appropriate action.
                return NotFound();
            }
        }


        // an edit method to display all hour logged time info based on an given id
        public async Task<IActionResult> Edit(int projectId, int? recordId) // id = the ProjectId, recordId = the Id from the ProjectHoursLog table meaning the time id
        {
            try {

                // if recordid is null return to the project details with given id.
                if(projectId == null && recordId == null) {
                    _notyfService.Warning("Time or Date doesn't exist!!",5); // Give a warning.
                    return RedirectToAction("Index", "Project"); // Redirect to the Details action with the projectId
                }

                // if recordid is null return to the project details with given id.
                if(recordId == null) {
                    _notyfService.Warning("Time or Date doesn't exist!!",5); // Give a warning.
                    return RedirectToAction("Details", "Project", new { id = projectId }); // Redirect to the Details action with the projectId
                }

                // if id is null return to project index.
                if (projectId == null) {
                    _notyfService.Warning("Something whent wrong!!",5); // Give a warning.
                    return RedirectToAction("Index", "Project", new { id = projectId }); // Redirect to the index action
                }

                var hours = await _context.ProjectHoursLogs.FindAsync(recordId); // collect all data from the given id
                // if hours is null throw an error
                if (hours == null) {
                    _notyfService.Warning("Time doesn't exist!!",5); // Give a warning.
                    return RedirectToAction("Details", "Project", new { id = projectId }); // Redirect to the Details action with the projectId
                }

                return View(hours); // return view with data
            }
            catch (Exception ex) {
                // For example, you can log the exception and display a user-friendly error message.
                _logger.LogError(ex, "An error occurred while processing the Edit action.");

                // give warning
                _notyfService.Warning("Something whent wrong!!",5);

                // Redirect to an error page or take other appropriate action.
                return NotFound();
            }

        }

        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit([Bind("Id,UserId,ProjectId,DateStartTime,DateEndTime,DateTimeDiff")] ProjectHoursLog projectHoursLogs)
        {
            try {
                // if null
                if(projectHoursLogs == null) {
                    _notyfService.Warning("Time or Date doesn't exist!!",5); // Give a warning.
                    return RedirectToAction("index", "Project"); // Redirect to the index of project
                }

                // if null
                if(projectHoursLogs.ProjectId == null) {
                    _notyfService.Warning("Something whent wrong!!",5); // Give a warning.
                    return RedirectToAction("index", "Project"); // Redirect to the index of project
                }

                // Validate the DateTimeDiff field
                string dateTimeDiff = projectHoursLogs.DateTimeDiff;
                string validationResult = ValidateTime(dateTimeDiff);
                if (validationResult != dateTimeDiff)
                {
                    _notyfService.Warning(validationResult, 5);
                    return RedirectToAction("Edit", "ProjectHoursLogs", new { recordId = projectHoursLogs.Id }); // Redirect to the Details action with the projectId
                }

                // add all submitted field to an array
                string[] requiredFields = { "DateStartTime", "DateEndTime", "DateTimeDiff"};

                // loop through array and check if fiels are null, if yes give an Model error
                foreach (var field in requiredFields)
                {
                    if (string.IsNullOrWhiteSpace(projectHoursLogs.GetType().GetProperty(field)?.GetValue(projectHoursLogs)?.ToString()))
                    { 
                        _notyfService.Warning($"The {field} field is required or invalid.", 5); // Give a warning.
                        ModelState.AddModelError(field, "The field is required or invalid.");
                    }
                }

                // if model has error return view with error message.
                if (!ModelState.IsValid)
                {
                    _notyfService.Warning("The field is required or invalid.",5); // Give a warning.
                    return View(); // Return the view to show validation errors.
                }

                if (ModelState.IsValid)
                {
                    // update the new data to the entity
                    _context.Update(projectHoursLogs);
                    // save the update in the database
                    await _context.SaveChangesAsync();

                    _notyfService.Success("Succesfully updated.",5); // Give a warning.
                    // Redirect to the Details action with the projectId
                    return RedirectToAction("Details", "Project", new { id = projectHoursLogs.ProjectId }); // Redirect to the Details action with the projectId
                }

                _notyfService.Warning("The field is required or invalid.",5); // Give a warning.
                return NotFound(); // If there was a validation error, you may want to handle it appropriately.

            }
            catch (Exception ex) {
                // For example, you can log the exception and display a user-friendly error message.
                _logger.LogError(ex, "An error occurred while processing the Create action.");

                // Redirect to an error page or take other appropriate action.
                return NotFound();
            }
        }

        public static string ValidateTime(string input)
        {
            // Define regular expression pattern for "hh:mm" format
            string pattern = @"^([0-3]?[0-9]|4[0-8]):([0-5][0-9])$";

            // Check if the input matches the pattern
            if (Regex.IsMatch(input, pattern))
            {
                // Parse hours and minutes
                string[] timeParts = input.Split(':');
                int hours = int.Parse(timeParts[0]);
                int minutes = int.Parse(timeParts[1]);

                if (hours == 48 && minutes != 0)
                {
                    return "Time cannot surpass 48:00"; // If it's "48:xx," set it to "48:00"
                }
                else if (hours == 0 && minutes == 0)
                {
                    return "You haven't inserted any time.";
                }
                else if (hours >= 0 && hours <= 48 && minutes >= 0 && minutes <= 59)
                {
                    return input; // Time is valid within the specified range
                }
            }

            // If input doesn't match the pattern or is out of range, return an error message
            return "Invalid time format or out of range.";
        }

    }
}