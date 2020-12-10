using System;

namespace API.DTOs
{
    public class EmailDto
    {
        public string Email { get; set; }
        public string ManagerMail { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DOB { get; set; }
        public string Position { get; set; }
        
        
    }
}