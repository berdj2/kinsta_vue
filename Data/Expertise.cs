using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace YDCManagementApp.Data;

public partial class Expertise
{
    public int Id { get; set; }

    public string Name { get; set; }

     public virtual ICollection<Project> Projects { get; set; } = new List<Project>();
}