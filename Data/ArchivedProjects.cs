using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace YDCManagementApp.Data;

public partial class ArchivedProjects
{
    public int Id { get; set;}

    public int? ClientId { get; set;}

    public int? ContactId { get; set; }

    public int? ExpertiseId { get; set; }

    public string UserId { get; set; }

    public DateTime DeletedAt { get; set; }

}