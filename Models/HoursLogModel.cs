using YDCManagementApp.Data;

namespace YDCManagementApp.Models
{
    public class HoursLogModel
    {
        public User SelectedUser { get; set; }

       public Project SelectedProject { get; set; }

        public ProjectHoursLog ProjectHoursLogs { get; set; }

        public List<User> UsersList { get; set; }

        public List<Project> ProjectsList { get; set; }
         public List<ProjectHoursLog> ProjectHoursLogsList { get; set; }

    }
}

