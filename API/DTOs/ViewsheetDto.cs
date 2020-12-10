using System;

namespace API.DTOs
{
    public class ViewsheetDto
    {
        public DateTime Date { get; set; }
        
        public string TaskDetail { get; set; }
        public string ClientName { get; set; }
    }
}