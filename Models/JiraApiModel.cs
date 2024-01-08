// Jira Api Model.
// represents json object for api calls

// import models into api controller and call property names to make api calls
// add requiring client data to property's (example = description : c.Project.ProjectDescription)

namespace YDCManagementApp.Models
{
    public class JiraApiModel
    {
        public string assigneeType  { get;  set; } 
        public string avatarId { get; set; }
        public string description { get; set; }
        public string issueSecurityScheme { get; set;}
        public string key { get; set; }
        public string leadAccountId { get; set; }
        public string name { get; set; }
        public string permissionScheme { get; set; }
        public string projectTemplateKey { get; set; } = "com.atlassian.jira-core-project-templates:jira-core-simplified-process-control";
        public string url { get; set; }

    }
};