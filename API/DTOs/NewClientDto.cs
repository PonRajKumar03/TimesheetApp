using System;

namespace API.DTOs
{
    public class NewClientDto
    {
        public string ClientName { get; set; }
        public string ProjectName { get; set; }
        public string ProjectDetails { get; set; }
        public int HoursLimit { get; set; }
        public DateTime CompleteDate { get; set; }
        public string ManagerMail { get; set; }
    }
}