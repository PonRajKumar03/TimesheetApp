using System.Collections.Generic;

namespace API.DTOs
{
    public class UserDto
    {
        public string Email_ID { get; set; }
        public string Token { get; set; }
        public string Username { get; set; }

        public string UserPosition { get; set; }
        public List<string> Employees { get; set; }
        public List<string> Clients { get; set; }
        public List<string> EmployeeEmail { get; set; }
        public List<string> Projects { get; set; }
        public int AllowedDate { get; set; }
        public List<string> EmployeesWholeMail { get; set; }
        public List<string> EmployeesWhole { get; set; }

    }
}