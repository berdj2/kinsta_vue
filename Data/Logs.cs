using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace YDCManagementApp.Data;

public partial class Logs
{
    public int LogId { get; set; }

    public int RecordId { get; set; }

    public int UserId { get; set; }

    public string TableName { get; set; }

    public bool LogStatus { get; set; }

    public string ErrorMessage { get; set; }

    public string Method { get; set; }

    public string OldValues { get; set; }

    public string NewValues { get; set; }

    public DateTime LogTime { get; set; }

    public virtual User? Users { get; set; }

}