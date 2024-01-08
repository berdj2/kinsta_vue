using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace YDCManagementApp.Data;

public partial class Functions
{
    public int Id { get; set; }

    [Required]
    [RegularExpression(@"^[^'""$*()\-_]*$", ErrorMessage = "Invalid characters detected.")]
    public string FunctionName { get; set; } = null!;

    public virtual ICollection<ClientContact> ClientContacts { get; set; } = new List<ClientContact>();
}
