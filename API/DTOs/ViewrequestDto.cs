using System;

namespace API.DTOs
{
    public class ViewrequestDto
    {
        public DateTime Startdate { get; set; }
        public DateTime Enddate { get; set; }
        public string Email { get; set; }
    }
}