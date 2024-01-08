using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace YDCManagementApp.Data;

public partial class Client
{
    public int Id { get; set; }

    [Required]
    [RegularExpression(@"^[^'""$*()\-_]*$", ErrorMessage = "Invalid characters detected.")]
    public string CompanyName { get; set; } = null!;

    [Required]
    [RegularExpression(@"^[^'""$*()\-_]*$", ErrorMessage = "Invalid characters detected.")]
    public string Website { get; set; } = null!;
    public bool ClientStatus { get; set; }

    public virtual ICollection<ClientContact> ClientContacts { get; set; } = new List<ClientContact>();

    public virtual ICollection<Project> Projects { get; set; } = new List<Project>();

    public virtual ICollection<ClientInfo> ClientInfo { get; set; } = new List<ClientInfo>();
}
