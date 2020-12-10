using System;

namespace API.Entities
{
    public class Timesheet
    {
        public int Id { get; set; }
        public string Email_ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Date { get; set; }
        public int Number_of_hours { get; set; }

        public string Task_Detail { get; set; }

        public string Project_Name { get; set; }
        public string Datestring { get; set; }
        public string Dateshortstring { get; set; }
    }
}