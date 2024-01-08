using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace YDCManagementApp.Data;

public partial class User
{
    public string? UserId { get; set ;} 

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Email { get; set; }

    public DateTime LastLogin { get; set; }

    public virtual ICollection<ProjectHoursLog> ProjectHoursLogs { get; set; } = new List<ProjectHoursLog>();

    public virtual ICollection<Logs> Logs { get; set; } = new List<Logs>();

}