using YDCManagementApp.Data;

namespace YDCManagementApp.Models
{
    // viewModel that retrieves existing data from database and organizes them in lists.
    // It is used to display requested data on the user interface.
    public class ProjectsAndCustomerViewModel
    {
        public List<Client> Clients { get; set; }

        public Client client { get; set; }

        public List<Project> Projects { get ; set; }

        public List<ClientContact> ClientContacts { get; set; }
    
        public List<Functions> Functions { get; set; }

        public List<ClientInfo> ClientInfo { get; set; }
    
        public List<Expertise> Expertises { get; set ;}

        public List<User> Users { get; set; }

        public List<ProjectHoursLog> ProjectHoursLogs { get; set; }
    }
}