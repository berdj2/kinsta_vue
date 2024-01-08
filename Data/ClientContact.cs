using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace YDCManagementApp.Data;

public partial class ClientContact
{
    public int Id { get; set; }


    public int? ClientId { get; set; }

    public int? ProjectId { get; set; }

    public int? FunctionId { get; set; }

    [Required]
    [RegularExpression(@"^[^'""$*()\-_]*$", ErrorMessage = "Invalid characters detected.")]
    public string FirstName { get; set; } = null!;


    [RegularExpression(@"^[^'""$*()\-_]*$", ErrorMessage = "Invalid characters detected.")]
    public string? Infix { get; set; }

    [Required]
    [RegularExpression(@"^[^'""$*()\-_]*$", ErrorMessage = "Invalid characters detected.")]
    public string LastName { get; set; } = null!;

    [Required]
    [RegularExpression(@"^[^'""$*()\-_]*$", ErrorMessage = "Invalid characters detected.")]
    public string Email { get; set; } = null!;

    [Required]
    [RegularExpression(@"^[^'""$*()\-_]*$", ErrorMessage = "Invalid characters detected.")]
    public string CallingCodeOffice { get; set; } = null!;

    public string OfficePhoneNumber { get; set; } = null!;

    public string CallingCodeMobile { get; set; } = null!;

    [Required]
    [RegularExpression(@"^[^'""$*()\-_]*$", ErrorMessage = "Invalid characters detected.")]
    public string MobileNumber { get; set; } = null!;

    public bool IsDeleted { get; set; }

    public virtual Client? Client { get; set; }

    public virtual Functions? Functions { get; set; }
    
    public virtual ICollection<Project> Projects { get; set; } = new List<Project>();
}
