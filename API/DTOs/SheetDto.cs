using System;

namespace API.DTOs
{
    public class SheetDto
    {
        public string Email_ID { get; set; }

        public DateTime Date { get; set; }

        public int NoofHours { get; set; }  

        public string Taskdetail { get; set; }

        public string ProjectName { get; set; }
    }
}