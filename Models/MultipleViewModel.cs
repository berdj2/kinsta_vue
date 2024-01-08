using YDCManagementApp.Data;

namespace YDCManagementApp.Models
{
    // viewModel that retrieves existing data from database and organizes them in lists.
    // It is used to display requested data on the user interface.
    public class MultipleViewModel
    { 
        public string Message { get; set; }

        public Client Client {get; set;}
        
        public ClientInfo clientInfo {get; set;}

        public List<ClientInfo> ClientInfo { get; set; }
    
    }
}