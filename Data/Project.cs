using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace YDCManagementApp.Data;

public partial class Project
{
    public int Id { get; set; }

    public int? ClientId { get; set; }

    public int? ContactId { get; set; }

    public int? ExpertiseId { get; set; }

    [Required]
    [RegularExpression(@"^[^'""$*()\-_]*$", ErrorMessage = "Invalid characters detected.")]
    public string ProjectName { get; set; } = null!;

    [Required]
    [RegularExpression(@"^[^'""$*()\-_]*$", ErrorMessage = "Invalid characters detected.")]
    public string ProjectDescription { get; set; } = null!;

    [Required]
    public DateTime ProjectDeadline { get; set; }

    public bool ProjectStatus { get; set; }

    public bool IsDeleted { get; set; }

    public virtual Client? Client { get; set; }

    public virtual ClientContact? Contact { get; set; }

    public virtual Expertise? Expertise { get; set;}
}
