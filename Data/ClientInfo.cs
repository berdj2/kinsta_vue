using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace YDCManagementApp.Data;

public partial class ClientInfo
{
    public int Id { get; set; }

    public int ClientId { get; set; }

    // [Required]
    [RegularExpression(@"^[^'""$*()\-_]*$", ErrorMessage = "Invalid characters detected.")]
    public string? Street { get; set; }
    // [Required]
    [RegularExpression(@"^[^'""$*()\-_]*$", ErrorMessage = "Invalid characters detected.")]
    public string? ZipCode { get; set; }
    // [Required]
    [RegularExpression(@"^[^'""$*()\-_]*$", ErrorMessage = "Invalid characters detected.")]
    public string? State { get; set; }
    // [Required]
    [RegularExpression(@"^[^'""$*()\-_]*$", ErrorMessage = "Invalid characters detected.")]
    public string? City { get; set; }
    // [Required]
    [RegularExpression(@"^[^'""$*()\-_]*$", ErrorMessage = "Invalid characters detected.")]
    public string? Country { get; set; }
    // [Required]
    [RegularExpression(@"^[^'""$*()\-_]*$", ErrorMessage = "Invalid characters detected.")]
    public string? AddressNum { get; set; }

    public virtual Client? Client { get; set; }
}