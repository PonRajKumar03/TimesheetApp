using System;

namespace API.DTOs
{
    public class SheetResultDto
    {
        public string Username { get; set; }
        public DateTime Date { get; set; }


        public int NoofHours { get; set; }  

        public string Taskdetail { get; set; }

        public string ClientName { get; set; }
    }
}