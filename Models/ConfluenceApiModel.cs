
using System.ComponentModel;
using Microsoft.CodeAnalysis;

// represents json object for api calls
// Confluence Api.

// import models into api controller and call property names to make api calls
// add requiring client data to property's (example = description : c.Project.ProjectDescription)

// Full Json object:
// {
//     "key": "TEST",
//     "name": "test space",
//     "description": {
//         "plain": {
//             "value": "This is a test space",
//             "representation": "plain"
//         }
//     },
//     "metadata": {}
// }

// 0 references not yet configured upon creating page. (empty data models)

namespace YDCManagementApp.Models
{
    public class ConfluenceApiModel
    {
        public string key { get; set; }
        public string name { get; set; }
        public Description description { get; set; }
        public List<Plain> plains { get; set; }
        public List<Metadata> metadata { get; set; }
    }

    public partial class Description
    {
        public Plain plain { get; set; }
    }

    public partial class Plain
    {
        public string  value { get; set; }
        public string representation { get; set ; }
    }
}