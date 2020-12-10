using System;

namespace API.Entities
{
    public class Email
    {
        public int ID{ get; set; }
        
        public string EmailID { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public DateTime DOB { get; set; }
    }
}