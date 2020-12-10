using System;

namespace API.Entities
{
    public class UsrEmail
    {
        public int ID{ get; set; }
        
        public string EmailID { get; set; }
        public string ManagerMail { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public DateTime DOB { get; set; }
        public string Position { get; set; }
    }
}