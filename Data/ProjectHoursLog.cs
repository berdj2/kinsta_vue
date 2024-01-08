using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using NuGet.Packaging.Signing;

namespace YDCManagementApp.Data;

public partial class ProjectHoursLog
{
    public int Id { get; set; }

    public string UserId { get; set; }

    public int ProjectId { get; set; }

    [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}", ApplyFormatInEditMode = true)]
    
    [DataType(DataType.DateTime)]
    public DateTime DateStartTime { get; set; }

    [DataType(DataType.DateTime)]
    public DateTime DateEndTime { get; set; }
    
    public string DateTimeDiff { get; set; }

    public Project? Project { get; set; }

    public User? User { get; set; }
    
}   